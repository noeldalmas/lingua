// src/components/Quiz/QuizQuestion.jsx
import React from "react";
import "../../styles/main.css";

const QuizQuestion = ({ question, onAnswer }) => {
  const handleAnswer = (e) => {
    onAnswer(question.id, e.target.value);
  };

  return (
    <div className="quiz-question">
      <h3>{question.text}</h3>
      {question.options.map((option) => (
        <label key={option} className="quiz-option">
          <input
            type="radio"
            name={`question-${question.id}`}
            value={option}
            onChange={handleAnswer}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default QuizQuestion;
