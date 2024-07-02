// src/pages/DashboardPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../redux/selectors/authSelectors";
import "../styles/main.css";

const DashboardPage = () => {
  const user = useSelector(selectAuthUser);

  return (
    <div className="dashboard-page">
      <h1>Welcome, {user.name}!</h1>
      <div className="dashboard-content">
        <section>
          <h2>Your Progress</h2>
          {/* Include components or content to show user progress */}
        </section>
        <section>
          <h2>Recommendations</h2>
          {/* Include components or content for course recommendations */}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
