import axios from 'axios';
import { React, useState } from 'react';

const AddBook = () => {
  const [Data, SetData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    SetData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();  // ✅ Prevents page reload
    try {
      if (
        !Data.url === "" || !Data.title === "" || !Data.author === "" ||
        !Data.price === "" || !Data.desc === "" || !Data.language === ""
      ) {
        alert("All fields are required");

      }

      const response = await axios.post(
        "https://bookheaven-ma5y.onrender.com/api/v1/add-book",
        Data,
        { headers }
      );

      SetData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });

      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='h-[100%] p-0 md:p-4'>
      <h6 className='text-xl md:text-5xl font-semibold text-zinc-500 mb-8'>
        Add Book
      </h6>

      {/* ✅ Wrapped in a <form> */}
      <form className='p-4 bg-zinc-800 rounded' onSubmit={submit}>
        <div>
          <label className='text-zinc-400'>Image</label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='URL of image'
            name='url'
            required
            value={Data.url}
            onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label className='text-zinc-400'>Title of book</label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Title of book'
            name='title'
            required
            value={Data.title}
            onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label className='text-zinc-400'>Author of book</label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Author of book'
            name='author'
            required
            value={Data.author}
            onChange={change}
          />
        </div>

        {/* ✅ Wrapped "Language" and "Price" inside one div */}
        <div className='mt-4 flex gap-4'>
          <div className='w-1/2'>
            <label className='text-zinc-400'>Language</label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Language of book'
              name='language'
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className='w-1/2'>
            <label className='text-zinc-400'>Price</label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='Price of book'
              name='price'
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        <div className='mt-4'>
          <label className='text-zinc-400'>Description of book</label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Description of book'
            name='desc'
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
