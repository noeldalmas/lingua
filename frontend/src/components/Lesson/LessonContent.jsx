// src/components/Lesson/LessonContent.jsx
import React from "react";
import "../../styles/main.css";

const LessonContent = ({ lesson }) => {
  return (
    <div className="lesson-content">
      <h1>{lesson.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </div>
  );
};

export default LessonContent;
