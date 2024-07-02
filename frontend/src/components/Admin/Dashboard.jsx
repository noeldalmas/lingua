// src/components/Admin/Dashboard.jsx
import React from "react";
import "../../styles/main.css";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        <section>
          <h2>Platform Statistics</h2>
          {/* Include components or content to show platform statistics */}
        </section>
        <section>
          <h2>User Management</h2>
          {/* Include components or content for user management */}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
