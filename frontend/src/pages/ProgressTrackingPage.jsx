// src/pages/ProgressTrackingPage.jsx
import React from "react";
import ProgressChart from "../components/Progress/ProgressChart";
import ProgressDetail from "../components/Progress/ProgressDetail";
import "../styles/main.css";

const ProgressTrackingPage = ({ progressData }) => {
  return (
    <div className="progress-tracking-page">
      <h1>Progress Tracking</h1>
      <ProgressChart data={progressData.chartData} />
      <ProgressDetail progress={progressData.detailData} />
    </div>
  );
};

export default ProgressTrackingPage;
