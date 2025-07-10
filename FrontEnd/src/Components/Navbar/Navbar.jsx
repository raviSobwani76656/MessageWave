import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="px-4 font-bold text-xl">MessageWave</div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-blue-500 md:bg-transparent md:items-center space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0 transition-all duration-300 ease-in-out`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 ${
                isActive ? "underline font-bold" : "hover:underline"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 ${
                isActive ? "underline font-bold" : "hover:underline"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Messages
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 ${
                isActive ? "underline font-bold" : "hover:underline"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contacts
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 ${
                isActive ? "underline font-bold" : "hover:underline"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/createAccount"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 ${
                isActive ? "underline font-bold" : "hover:underline"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Create Account
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
