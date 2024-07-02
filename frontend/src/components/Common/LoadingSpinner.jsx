// src/components/Common/LoadingSpinner.jsx
import React from "react";
import "./LoadingSpinner.css";
import "../../styles/main.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
