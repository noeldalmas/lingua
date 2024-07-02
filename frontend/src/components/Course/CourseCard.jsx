// src/components/Course/CourseCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/main.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img
        src={course.image}
        alt={course.title}
        className="course-card-image"
      />
      <div className="course-card-content">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <Link to={`/course/${course.id}`} className="course-card-link">
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
