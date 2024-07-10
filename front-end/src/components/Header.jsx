// src/components/Header.jsx
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">RecSysVideos</div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <nav className="nav-links">
        <a href="#">Videos</a>
        <a href="#">Log In</a>
        <a href="#">Sign Up</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
