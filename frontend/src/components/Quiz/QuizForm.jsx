// src/components/Quiz/QuizForm.jsx
import React, { useState } from "react";
import "../../styles/main.css";

const QuizForm = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      {questions.map((question) => (
        <div key={question.id} className="quiz-question">
          <h3>{question.text}</h3>
          {question.options.map((option) => (
            <label key={option} className="quiz-option">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => handleChange(question.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="submit" className="quiz-submit-button">
        Submit
      </button>
    </form>
  );
};

export default QuizForm;
