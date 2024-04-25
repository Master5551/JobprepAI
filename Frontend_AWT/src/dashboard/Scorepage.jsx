import React, { useState, useEffect } from "react";
import ScoreCard from "./scores";
import algo from "../assets/images/neural.png";

export default function Scorepage() {
  const [interviews, setInterviews] = useState([]);

  // Mock data for description based on subject name
  const subjectDescriptions = {
    Algorithm: "This interview focused on Algorithmic Concepts.",
  };

  useEffect(() => {
    // Fetch interviews data from the backend
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/details");
      const data = await response.json();

      console.log("Fetched interviews data:", data); // Log fetched data

      // Extract id and subject_name from each interview
      const extractedData = data.map(({ id, subject_name }) => ({
        id,
        subject_name,
      }));

      console.log("Extracted data:", extractedData); // Log extracted data

      setInterviews(extractedData);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {interviews.map((interview) => (
        <ScoreCard
          key={interview.id}
          title={`Interview ${interview.id}`}
          subtitle={interview.subject_name}
          // interviewId={interview.id}
          imageSrc={algo}
          description={subjectDescriptions[interview.subject_name]}
        />
      ))}
    </div>
  );
}
