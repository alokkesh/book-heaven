import React from 'react';
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      {/* Background Overlay */}
      <div className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}></div>

      {/* Modal Container */}
      <div className={`${userDiv} fixed top-0 left-0 h-screen w-full flex items-center justify-center`}>
        <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-zinc-800">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button onClick={() => setuserDiv("hidden")}>
              <RxCross1 />
            </button>
          </div>

          {/* User Details */}
          <div className="mt-2">
            <label>Username: <span className="font-semibold">{userDivData.username}</span></label>
          </div>
          <div className="mt-4">
            <label>Email: <span className="font-semibold">{userDivData.email}</span></label>
          </div>
          <div className="mt-4">
            <label>Address: <span className="font-semibold">{userDivData.address}</span></label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
