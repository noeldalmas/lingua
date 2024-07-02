// src/components/Admin/Reports.jsx
import React from "react";
import "../../styles/main.css";

const Reports = ({ reports }) => {
  return (
    <div className="reports">
      <h2>Reports</h2>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>
            <span>{report.date}</span>
            <span>{report.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
