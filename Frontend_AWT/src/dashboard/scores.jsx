import React from "react";
import { useNavigate } from "react-router-dom";
import "./scores.css";
import algo from "../assets/images/neural.png";

const GoToAnswer = ({ interviewId }) => {
  const navigate = useNavigate();

  const gotoanswer = () => {
    navigate(`/answer`);
  };

  return (
    <button className="go-to-answers-button" onClick={gotoanswer}>
      Go to Answers
    </button>
  );
};

const ScoreCard = ({ title, imageSrc, description, interviewId }) => {
  return (
    <div className="score-card">
      <h2 className="score-card-title">{title}</h2>
      <img className="round-image" src={algo} alt="Round" />
      <p className="description">{description}</p>
      <GoToAnswer interviewId={interviewId} />
    </div>
  );
};

export default ScoreCard;
