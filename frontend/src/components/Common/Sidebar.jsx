// src/components/Common/Sidebar.jsx
import React, { useState } from "react";
import "../../styles/main.css";

const Sidebar = ({ onItemSelected }) => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onItemSelected(item);
  };

  return (
    <aside className="sidebar">
      <ul>
        {[
          "Dashboard",
          "Courses",
          "Lessons",
          "Quizzes",
          "Community",
          "Profile",
        ].map((item) => (
          <li
            key={item}
            className={selectedItem === item ? "selected" : ""}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
