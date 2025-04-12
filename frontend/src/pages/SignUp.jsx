import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [Values, setValues] = useState(
    {
      username: "",
      email: "",
      password: "",
      address: "",
    })
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const submit = async () => {
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All fields are required")
      }
      else {
        const response = await axios.post("https://bookheaven-ma5y.onrender.com/api/v1/sign-up",
          Values
        );
        alert(response.data.message);
        navigate("/login")
      }
    } catch (error) {
      alert(error.response.data.message);

    }
  }
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl font-semibold'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor='username' className='text-zinc-400'>
              Username
            </label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
              placeholder='Username'
              name='username'
              id='username'
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='email' className='text-zinc-400'>
              Email
            </label>
            <input
              type='email'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
              placeholder='xyz@example.com'
              name='email'
              id='email'
              required
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='password' className='text-zinc-400'>
              Password
            </label>
            <input
              type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
              placeholder='Password'
              name='password'
              id='password'
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='address' className='text-zinc-400'>
              Address
            </label>
            <textarea
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
              rows='5'
              placeholder='Address'
              name='address'
              id='address'
              required
              value={Values.address}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={submit}>
              Sign Up
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-blue-500 hover:underline ml-2'
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
