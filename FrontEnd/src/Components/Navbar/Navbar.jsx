import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import handleLogout from "../../utils/Logout";
import { useNavigate } from "react-router-dom";
import { Menu, X, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/userStore";

function Navbar() {
  const logouttoast = () => toast.success("Logout Successfull");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    useUserStore.getState().fetchLoggedInUser();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white text-gray-800 p-2 fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="px-2 font-bold text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span className="tracking-tight">MessageWave</span>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        {user && (
          <button
            className="md:hidden p-1 rounded hover:bg-gray-100 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Navigation Links (only if logged in) */}
        {user && (
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:static top-12 left-0 right-0 bg-white md:bg-transparent md:items-center space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0 transition-all duration-300 ease-in-out transform ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0 md:translate-y-0 md:opacity-100"
            } border-b border-gray-200 md:border-none`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-600 text-sm px-3 py-1 rounded font-medium transition-colors duration-200 hover:bg-gray-100 ${
                  isActive
                    ? "bg-gray-100 text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `text-gray-600 text-sm px-3 py-1 rounded font-medium transition-colors duration-200 hover:bg-gray-100 ${
                  isActive
                    ? "bg-gray-100 text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Messages
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-gray-600 text-sm px-3 py-1 rounded font-medium transition-colors duration-200 hover:bg-gray-100 ${
                  isActive
                    ? "bg-gray-100 text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </NavLink>

            <button
              onClick={() => {
                handleLogout(navigate);
                setIsMenuOpen(false);
                logouttoast();
              }}
              className="text-gray-600 text-sm px-3 py-1 rounded font-medium transition-colors duration-200 hover:bg-red-100 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
