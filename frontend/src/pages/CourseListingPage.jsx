// src/pages/CourseListingPage.jsx
import React from "react";
import CourseList from "../components/Course/CourseList";
import "../styles/main.css";

const CourseListingPage = ({ courses }) => {
  return (
    <div className="course-listing-page">
      <h1>Available Courses</h1>
      <CourseList courses={courses} />
    </div>
  );
};

export default CourseListingPage;
