// src/components/Progress/ProgressDetail.jsx
import React from "react";
import "../../styles/main.css";

const ProgressDetail = ({ progress }) => {
  return (
    <div className="progress-detail">
      <h2>Your Learning Progress</h2>
      <ul>
        {progress.map((entry, index) => (
          <li key={index}>
            <span>{entry.date}</span>
            <span>{entry.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressDetail;
