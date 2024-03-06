import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.png";

/* Static navBar which is at the top of all frontend pages It utilizes react-router

*/

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" style={{ width: '75px', height: '75px' }} />
      </Link>
      <div className={`menu ${menuOpen ? 'bg-gray-700' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink
            className="font-graduate"
            to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="font-graduate"
            to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            className="font-graduate"
            to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
