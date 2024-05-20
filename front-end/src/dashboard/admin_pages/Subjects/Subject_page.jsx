import React, { useState, useEffect } from "react";
import SubjectCard from "./Subject_card";
import { Button, Modal, TextareaAutosize } from "@mui/material";
import { FaPlus } from "react-icons/fa";

export default function Subjects() {
  const [interviews, setInterviews] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await fetch("http://localhost:3001/tables");
      const data = await response.json();
      setInterviews(data.tables.map((tableName) => ({ name: tableName })));
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const handleAddQuestion = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewSubject(""); // Reset the new subject input
  };

  const handleAddSubject = async () => {
    // Check if the new subject already exists
    if (interviews.some((interview) => interview.name === newSubject)) {
      console.log("Subject already exists.");
    } else {
      // Add the new subject
      setInterviews([...interviews, { name: newSubject }]);
      console.log("Added subject:", newSubject);
      // Call another API if the subject doesn't exist
      try {
        const response = await fetch(
          `http://localhost:3001/api/subjects/createTable/${newSubject}`,
          {
            method: "POST",
            // Add other necessary headers and body if required
          }
        );
        const data = await response.json();
        console.log("Response from addSubject API:", data);
      } catch (error) {
        console.error("Error calling addSubject API:", error);
      }
    }
    handleCloseModal();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FaPlus />}
        onClick={handleAddQuestion}
        style={{ marginTop: 10, marginBottom: 20 }}
      >
        Add Subject
      </Button>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {interviews.map((interview, index) => (
          <SubjectCard
            key={index}
            title={interview.name}
            subjectName={interview.name}
          />
        ))}
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <h2 style={{ color: "black" }}>Add Subject</h2>
          <TextareaAutosize
            placeholder="Enter subject here"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "20px",
              resize: "both",
              overflow: "auto",
              color: "black",
            }}
            minRows={3}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSubject}
          >
            Add
          </Button>
        </div>
      </Modal>
    </>
  );
}
