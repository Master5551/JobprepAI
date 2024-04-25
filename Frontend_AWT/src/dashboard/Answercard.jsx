import React, { useState } from "react";
import "./AnswerCard.css";

const AnswerCard = ({ question, transcript }) => {
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
      {showTranscript && <div className="transcript">{transcript}</div>}
    </div>
  );
};

export default AnswerCard;
    