// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import Sidebar from "../components/Common/Sidebar";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/main.css";

const DashboardPage = () => {
  const { user } = useAuthContext();
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const handleItemSelected = (item) => {
    setSelectedComponent(item);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return <h1>Welcome, {user.name}!</h1>;
      case "Courses":
        return <h2>Courses Content</h2>;
      case "Lessons":
        return <h2>Lessons Content</h2>;
      case "Quizzes":
        return <h2>Quizzes Content</h2>;
      case "Community":
        return <h2>Community Content</h2>;
      case "Profile":
        return <h2>Profile Content</h2>;
      default:
        return <h1>Welcome, {user.name}!</h1>;
    }
  };

  return (
    <div className="app">
      <div className="main-content">
        <Sidebar onItemSelected={handleItemSelected} />
        <div className="content">
          <div className="dashboard-page">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
