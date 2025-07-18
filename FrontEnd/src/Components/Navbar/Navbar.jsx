import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import handleLogout from "../../utils/Logout";
import { useNavigate } from "react-router-dom";
import { Menu, X, MessageSquare } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="px-4 font-bold text-xl flex items-center gap-2 group">
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
          <span className="group-hover:text-blue-200 transition-colors duration-200">
            MessageWave
          </span>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 animate-spin-slow" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 md:bg-transparent md:items-center space-y-4 md:space-y-0 md:space-x-6 p-6 md:p-0 transition-all duration-500 ease-in-out transform ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 md:translate-y-0 md:opacity-100"
          }`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-800 font-bold shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-800 font-bold shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Messages
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-800 font-bold shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contacts
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-800 font-bold shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/createAccount"
            className={({ isActive }) =>
              `text-gray-100 text-lg px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-800 font-bold shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Create Account
          </NavLink>
          <button
            onClick={() => {
              handleLogout(navigate);
              setIsMenuOpen(false);
            }}
            className="text-gray-100 text-lg px-4 py-2 rounded-md hover:bg-red-600 hover:shadow-md transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
