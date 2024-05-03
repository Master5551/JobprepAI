import React, { useState, useEffect } from "react";
import { Select, MenuItem, Grid } from "@mui/material";
import ScoreCard from "./scores";
import { useParams } from "react-router-dom";

export default function Scorepage() {
  let userId;
  const [interviews, setInterviews] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [menuItems, setMenuItems] = useState([]); // State to store the menu items
  const { id } = useParams(); // Get the candidate ID from the URL params
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded JWT token:", decodedToken);
    userId = decodedToken.id;
    console.log("Decioededed:", decodedToken);
  } else {
    console.error("JWT token not found in local storage.");
  }

  useEffect(() => {
    fetchInterviews();
    fetchSubjects(); // Fetch subjects when the component mounts
  }, [id]); // Fetch interviews whenever the ID changes

  const fetchInterviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/candidate/${userId}`
      );
      const data = await response.json();

      const extractedData = data.map(({ id, subject_name, scores }) => ({
        id,
        subject_name,
        scores,
      }));
      console.log(extractedData);

      setInterviews(extractedData);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:3001/tables");
      const data = await response.json();
      console.log(data.tables); // Log the array of subjects

      // Remove "candidate" and "interview" from the array
      const filteredSubjects = data.tables.filter(
        (subject) => subject !== "candidate" && subject !== "interview"
      );

      if (Array.isArray(filteredSubjects)) {
        const items = filteredSubjects.map((subject, index) => (
          <MenuItem key={index} value={subject}>
            {subject}
          </MenuItem>
        ));
        items.unshift(
          <MenuItem key="default" value="">
            All Subjects
          </MenuItem>
        );
        setMenuItems(items);
      } else {
        console.error("Invalid data format: Expected an array of subjects");
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };
  const handleinterview = (score) => {};

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: -44,
          right: 10,
          backgroundColor: "#ffffff",
          padding: 5,
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Select
          value={selectedSubject}
          onChange={handleSubjectChange}
          variant="outlined"
          style={{ minWidth: 150 }}
        >
          {menuItems} {/* Render the dynamically populated MenuItem options */}
        </Select>
      </div>
      {interviews.length === 0 ? (
        <p
          style={{
            color: "grey",
            fontSize: 50,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "40px",
          }}
        >
          No interviews available.....
        </p>
      ) : (
        <Grid container spacing={2} style={{ marginTop: 40 }}>
          {interviews
            .filter(
              (interview) =>
                !selectedSubject || interview.subject_name === selectedSubject
            )
            .map(
              (interview) => (
                console.log("Interview scores:", interview.scores), //Console log interview scores
                (
                  <Grid item xs={4} key={interview.id}>
                    <ScoreCard
                      title={`Interview ${interview.id}`}
                      subtitle={interview.subject_name}
                      interviewId={interview.id}
                      subjectName={interview.subject_name}
                      scores={interview.scores}
                    />
                  </Grid>
                )
              )
            )}
        </Grid>
      )}
    </div>
  );
}
