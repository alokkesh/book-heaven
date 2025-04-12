import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();  // ✅ Prevents page reload when submitting the form
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("https://bookheaven-ma5y.onrender.com/api/v1/sign-in", Values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-screen bg-zinc-900 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-6 w-full md:w-2/5 lg:w-1/4">
        <p className="text-zinc-200 text-2xl font-semibold text-center mb-6">Login</p>

        {/* ✅ Wrap everything inside a <form> */}
        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-zinc-400 block mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full bg-zinc-900 text-zinc-100 p-3 outline-none rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              name="username"
              id="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-zinc-400 block mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-zinc-900 text-zinc-100 p-3 outline-none rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              name="password"
              id="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded hover:bg-blue-600 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-zinc-200">Or</p>
        <p className="flex mt-6 text-center text-zinc-200 font-medium">
          Don't have an account? &nbsp;
          <Link to="/signup" className="hover:text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
