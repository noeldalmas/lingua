// src/pages/QuizPage.jsx
import React from "react";
import QuizForm from "../components/Quiz/QuizForm";
import QuizResult from "../components/Quiz/QuizResult";
import "../styles/main.css";

const QuizPage = ({ quiz, onSubmit, score, total }) => {
  return (
    <div className="quiz-page">
      <QuizForm questions={quiz.questions} onSubmit={onSubmit} />
      <QuizResult score={score} total={total} />
    </div>
  );
};

export default QuizPage;
