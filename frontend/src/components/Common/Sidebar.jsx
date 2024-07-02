// src/components/Common/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/main.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/lessons">Lessons</Link>
        <Link to="/quizzes">Quizzes</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/community">Community</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
