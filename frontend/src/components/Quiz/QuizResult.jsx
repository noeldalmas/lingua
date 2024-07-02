// src/components/Quiz/QuizResult.jsx
import React from "react";
import "../../styles/main.css";

const QuizResult = ({ score, total }) => {
  return (
    <div className="quiz-result">
      <h2>Quiz Result</h2>
      <p>
        Your score is {score} out of {total}
      </p>
    </div>
  );
};

export default QuizResult;
