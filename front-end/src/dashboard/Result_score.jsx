import React, { useState } from "react";

const RoundProgressBar = ({ percent }) => {
  const [progress, setProgress] = useState(percent);

  // Calculate the position of the fill
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((100 - progress) / 100) * circumference;

  return (
    <div style={{ textAlign: "center" }}>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ transform: "translate(70px,10px) " }}
      >
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="#ddd"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="#007bff"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#000"
          fontSize="20"
          fontWeight="bold"
        >
          {`${progress}%`}
        </text>
      </svg>
    </div>
  );
};

export default RoundProgressBar;
