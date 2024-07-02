// src/components/Common/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useSelector } from "react-redux";
import "../../styles/Header.css";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Lingua</Link>
        </div>
        <nav className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/community">Community</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        {/* Conditionally render auth links or logout based on user state */}
        {user ? (
          <div className="auth-links">
            <Logout />
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Logout />
      </div>
    </header>
  );
};

export default Header;
