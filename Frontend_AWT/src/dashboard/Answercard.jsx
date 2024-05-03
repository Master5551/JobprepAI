import React, { useState } from "react";
import "./AnswerCard.css";

const AnswerCards = ({ question, transcript }) => {
  const [showTranscript, setShowTranscript] = useState(false);

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  return (
    <div className="answer-card">
      <div className="question">{question}</div>
      <div className="arrow" onClick={toggleTranscript}>
        &#9660;
      </div>
      {showTranscript && (
        <div className="transcript">
          <div>{transcript}</div>
        </div>
      )}
    </div>
  );
};

export default AnswerCards;
