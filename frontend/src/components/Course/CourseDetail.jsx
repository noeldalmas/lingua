// src/components/Course/CourseDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/main.css";

const CourseDetail = ({ courses }) => {
  const { id } = useParams();
  const course = courses.find((course) => course.id === id);

  if (!course) return <div>Course not found</div>;

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <img
        src={course.image}
        alt={course.title}
        className="course-detail-image"
      />
      <p>{course.description}</p>
      <div className="course-detail-lessons">
        <h2>Lessons</h2>
        <ul>
          {course.lessons.map((lesson) => (
            <li key={lesson.id}>{lesson.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetail;
