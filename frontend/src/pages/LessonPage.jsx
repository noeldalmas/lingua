// src/pages/LessonPage.jsx
import React from "react";
import LessonDetail from "../components/Lesson/LessonDetail";
import "../styles/main.css";

const LessonPage = ({ lessons }) => {
  return (
    <div className="lesson-page">
      <LessonDetail lessons={Lessons} />
    </div>
  );
};

export default LessonPage;
