// QuestionCard.jsx
import React, { useState } from "react";
import "./QuestionCard.css"; // Import CSS file

const QuestionCard = ({ question }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="question-card">
      <div className="question-title">{question.title}</div>
      {expanded && (
        <div className="answer-container">
          {question.answers.map((answer, index) => (
            <div key={index} className="answer">
              {answer}
            </div>
          ))}
        </div>
      )}
      <button className="view-answers-button" onClick={toggleExpansion}>
        {expanded ? "Hide Answers" : "View Answers"}
      </button>
    </div>
  );
};

export default QuestionCard;
