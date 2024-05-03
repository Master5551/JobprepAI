import React from "react";
import { useNavigate } from "react-router-dom";
import "./scores.css";
import algo from "../assets/images/neural.png";
import RoundProgressBar from "./Result_score";

const GoToAnswer = ({ interviewId, subjectName }) => {
  const navigate = useNavigate();

  const gotoanswer = async () => {
    try {
      navigate(`/answer`, { state: { id: interviewId, subject: subjectName } });
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <button className="go-to-answers-button" onClick={gotoanswer}>
      View Answer
    </button>
  );
};

const ScoreCard = ({
  title,

  description,
  interviewId,
  subjectName,
  scores,
}) => {
  // Check if scores is null or undefined
  if (scores === null || scores === undefined) {
    return (
      <div className="score-card">
        <h2 className="score-card-title">{title}</h2>
        <RoundProgressBar percent={scores} />
        <p className="description">{description}</p>

        <GoToAnswer interviewId={interviewId} subjectName={subjectName} />
      </div>
    );
  }

  // Convert scores to an array of floats
  const floatScores = scores
    .split(",")
    .map((score) => parseFloat(score.trim()));

  // Calculate average score
  const averageScore = parseFloat(
    (
      floatScores.reduce((total, score) => total + score, 0) /
      floatScores.length
    ).toFixed(2)
  );

  const renderScore = () => {
    // Check if averageScore is NaN (not a number)
    if (isNaN(averageScore)) {
      return "Processing";
    } else {
      return `Average Score: ${averageScore.toFixed(2)}`;
    }
  };

  return (
    <div className="score-card">
      <h2 className="score-card-title">{title}</h2>
      <RoundProgressBar percent={averageScore} />
      <p className="description">{description}</p>
      <GoToAnswer interviewId={interviewId} subjectName={subjectName} />
    </div>
  );
};

export default ScoreCard;
