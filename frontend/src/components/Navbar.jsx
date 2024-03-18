import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { useAuth } from "./AuthContext";

/* Static navBar which is at the top of all frontend pages It utilizes react-router

*/

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  //const { isLoggedIn, userEmail } = useAuth(); // we can either dynamically show the users role or email
  const { isLoggedIn, userRole } = useAuth();

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" style={{ width: "75px", height: "75px" }} />
      </Link>
      <div
        className={`menu ${menuOpen ? "bg-gray-700" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink className="font-graduate" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="font-graduate" to="/about">
            About
          </NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <NavLink className="font-graduate" to="/account">
              {userRole}
            </NavLink>
          ) : (
            <NavLink className="font-graduate" to="/login">
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
