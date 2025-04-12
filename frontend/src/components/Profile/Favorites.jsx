import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';

const Favorites = () => {
  const [FavoriteBooks, setFavoriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookheaven-ma5y.onrender.com/api/v1/get-favorites-books",
        { headers }
      );
      setFavoriteBooks(response.data.data)
    };
    fetch();
  }, [FavoriteBooks]);

  return (
    <>
      {FavoriteBooks && FavoriteBooks.length === 0 && (
        <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center flex-col w-full ">
          No Favorite Books
          <img src="./star.png" alt="star" className="h-[20vh] my-8" />
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {FavoriteBooks && FavoriteBooks.map((items, i) => (
          <div key={i}>
            <BookCard data={items} favorite={true} />
          </div>
        ))}
      </div>
    </>

  )
}

export default Favorites
