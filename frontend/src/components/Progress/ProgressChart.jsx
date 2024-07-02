// src/components/Progress/ProgressChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import "../../styles/main.css";

const ProgressChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Progress",
        data: data.map((entry) => entry.value),
        fill: false,
        backgroundColor: "#4a90e2",
        borderColor: "#4a90e2",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="progress-chart">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProgressChart;
