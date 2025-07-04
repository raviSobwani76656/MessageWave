import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="bg-blue-500 text-white p-4 flex justify-between w-full mb-16">
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
        </div>
      </nav>
    </>
  );
}

export default Navbar;
