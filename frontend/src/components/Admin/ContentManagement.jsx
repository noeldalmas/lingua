// src/components/Admin/ContentManagement.jsx
import React from "react";
import "../../styles/main.css";

const ContentManagement = ({ courses }) => {
  return (
    <div className="content-management">
      <h2>Content Management</h2>
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>
                {/* Add buttons or links for actions like edit and delete */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentManagement;
