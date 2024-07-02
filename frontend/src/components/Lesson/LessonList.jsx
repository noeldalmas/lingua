// src/components/Lesson/LessonList.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/main.css";

const LessonList = ({ lessons }) => {
  return (
    <div className="lesson-list">
      {lessons.map((lesson) => (
        <Link
          to={`/lesson/${lesson.id}`}
          key={lesson.id}
          className="lesson-link"
        >
          {lesson.title}
        </Link>
      ))}
    </div>
  );
};

export default LessonList;
