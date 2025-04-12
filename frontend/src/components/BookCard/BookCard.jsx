import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
const BookCard = ({ data, favorite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveBook = async () => {
    const response = await axios.put(
      "https://bookheaven-ma5y.onrender.com/api/v1/remove-book-from-favorite",
      {},
      { headers }
    );
    alert(response.data.message)
  }
  const wrapTitle = (title, wordLimit) => {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return title;
  };



  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className=" ">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <h2
            className="mt-4 text-xl text-white font-semibold break-words overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {wrapTitle(data.title, 20)}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">
            ₹ {data.price}
          </p>
        </div>
      </Link>
      {favorite && (
        <button className="bg-yellow-50  px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 hover:bg-red-500 hover:text-white hover:border-red-500 transition duration-300"
          onClick={handleRemoveBook}
        >
          Remove from favorite
        </button>
      )}
    </div>
  )
}

export default BookCard
