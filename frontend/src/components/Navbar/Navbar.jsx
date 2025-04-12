import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  // Remove 'Cart' and 'Profile' if not logged in
  if (!isLoggedIn) {
    links.splice(2, 2);
  }
  if (isLoggedIn == true && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn == true && role === "admin") {
    links.splice(3, 1);
  }
  const [mobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://img.icons8.com/color/50/literature.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookheaven blok md:flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4">
            {links.map((item, index) => (
              <div
                className="flex items-center justify-center"
                key={index} // Add the key to the outermost div
              >
                {item.title === "Profile" ||
                  item.title === "Admin Profile" ? (
                  <Link
                    to={item.link}
                    className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link
                    to={item.link}
                    className="hover:text-blue-500 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Login/Signup Links for Desktop */}
          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/Login"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}

          {/* Mobile Navigation Toggle */}
          <button
            className="block text-white text-2xl hover:text-zinc-400 md:hidden"
            onClick={() =>
              setMobileNav(mobileNav === "hidden" ? "block" : "hidden")
            }
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, index) => (
          <Link
            to={item.link}
            key={index} // Add key here
            className="text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
            onClick={() =>
              setMobileNav(mobileNav === "hidden" ? "block" : "hidden")
            }
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/Login"
              className="px-8 py-2 mb-8 text-3xl font-semibold border text-white border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/SignUp"
              className="px-8 py-2 mb-8 text-3xl font-semibold text-white bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
