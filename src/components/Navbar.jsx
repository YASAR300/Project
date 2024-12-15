import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/Meals" className="nav-link">Meals</Link>
        </li>
        <li className="nav-item">
          <Link to="/cocktails" className="nav-link">Cocktails</Link>
        </li>
        <li className="nav-item">
          <Link to="/potter" className="nav-link">Harry Potter</Link>
        </li>
        <li className="nav-item">
          <Link to="/banks" className="nav-link">Banks Data</Link>
        </li>
        <li className="nav-item">
          <Link to="/about-us" className="nav-link">About Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact-us" className="nav-link">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
