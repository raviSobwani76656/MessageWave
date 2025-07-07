import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className=" bg-blue-500 text-white p-4 flex justify-between mb-16">
        <div>ChatApp</div>
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline font-bold" : "hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline font-bold" : "hover:underline"
            }
            to="/messages"
          >
            Messages
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? "underline font-bold" : "hover:underline"
            }
          >
            Contacts
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "underline font-bold" : "hover:underline"
            }
          >
            Login
          </NavLink>
          <NavLink
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            to="/createAccount"
            className={({ isActive }) =>
              isActive ? "underline font-bold" : "hover:underline"
            }
          >
            Create Account
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
