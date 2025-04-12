import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { FiEdit } from "react-icons/fi";
import { GrLanguage } from 'react-icons/gr';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  //console.log(isLoggedIn, role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookheaven-ma5y.onrender.com/api/v1/get-book-by-id/${id}`
      );

      setData(response.data.data)
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavorites = async () => {
    const response = await axios.put("https://bookheaven-ma5y.onrender.com/api/v1/add-book-to-favorite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put("https://bookheaven-ma5y.onrender.com/api/v1/add-to-cart", {},
      { headers }
    );
    alert(response.data.message);
  }
  const deleteBook = async () => {
    const response = await axios.delete(
      "https://bookheaven-ma5y.onrender.com/api/v1/delete-book",
      { headers }
    )
    alert(response.data.message);
    navigate("/all-books")
  }
  return (
    <>
      {Data && (<div className=' px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start'>
        <div className=' w-full lg:w-3/6  '>
          {" "}
          <div className=' flex flex-col lg:flex-row bg-zinc-800 py-12 rounded justify-around'>
            {" "}
            <img src={Data.url} alt="/" className=' h-[50vh] md:h-[60vh] lg:h-[70vh] rounded' />
            {isLoggedIn === true && role === "user" && <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0 '>
              <button className='bg-white rounded-full text-3xl p-3 text-red-500 flex items-center justify-center'
                onClick={handleFavorites}
              >
                <FaHeart /> <span className='ms-4 block lg:hidden'>Favorites</span>
              </button>
              <button className='text-white rounded  mt-8 md:mt-0 lg:rounded-full text-3xl p-3  lg:mt-8 bg-blue-500 flex items-center justify-center'

                onClick={handleCart}
              >
                <FaCartPlus /><span className='ms-4 block lg:hidden'>Add to cart</span>
              </button>
            </div>
            }
            {isLoggedIn === true && role === "admin" && <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0 '>
              <Link
                to={`/updateBook/${id}`}
                className='bg-white rounded-full text-3xl p-3 flex items-center justify-center '>
                <FiEdit /> <span className='ms-4 block lg:hidden'>Edit</span>
              </Link>
              <button className='text-red-500 mt-8 md:mt-0 rounded lg:rounded-full text-3xl p-3  lg:mt-8 bg-white flex items-center justify-center'
                onClick={deleteBook}
              >
                <MdOutlineDeleteOutline /><span className='ms-4 block lg:hidden'>Delete book</span>
              </button>
            </div>
            }
          </div>
        </div>
        <div className='p-4 w-full lg:w-3/6'>
          <h2 className="text-4xl  text-zinc-300 font-semibold">{Data.title}</h2>
          <p className="text-zinc-400 mt-1">by {Data.author}</p>
          <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
          <p className='flex mt-4 items-center justify-start text-zinc-400'>
            <GrLanguage className="me-3" /> {Data.language}
          </p>
          <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
            Price: ₹ {Data.price}{" "}
          </p>
        </div>

      </div>
      )}
      {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader /> {" "}</div>}
    </>
  )
}

export default ViewBookDetails
