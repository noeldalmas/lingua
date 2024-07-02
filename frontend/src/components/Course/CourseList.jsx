// src/components/Course/CourseList.jsx
import React from "react";
import CourseCard from "./CourseCard";
import "../../styles/main.css";

const CourseList = ({ courses }) => {
  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
