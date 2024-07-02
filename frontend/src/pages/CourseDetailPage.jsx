// src/pages/CourseDetailPage.jsx
import React from "react";
import CourseDetail from "../components/Course/CourseDetail";
import "../styles/main.css";

const CourseDetailPage = ({ courses }) => {
  return (
    <div className="course-detail-page">
      <CourseDetail courses={courses} />
    </div>
  );
};

export default CourseDetailPage;
