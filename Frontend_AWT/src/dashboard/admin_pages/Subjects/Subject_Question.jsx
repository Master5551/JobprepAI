import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import { FaEdit, FaTimes, FaCheck, FaTrash, FaPlus } from "react-icons/fa";

const SubjectQuestions = () => {
  const location = useLocation();
  const { subject: subjectName } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [uiIds, setUiIds] = useState([]); // Array for UI IDs
  const [realIds, setRealIds] = useState([]); // Array for real IDs

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/subjects/${subjectName}`
        );
        const responseData = await response.json();
        const fetchedQuestions = responseData.data || [];
        const dummyIds = fetchedQuestions.map((_, index) => index + 1); // Generate dummy IDs
        setQuestions(fetchedQuestions);
        setUiIds(dummyIds);
        setRealIds(fetchedQuestions.map((question) => question.id));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (subjectName) {
      fetchQuestions();
    }
  }, [subjectName]);

  const handleEdit = (questionId, question, expectedAnswer) => {
    setEditedQuestion(question);
    setEditedAnswer(expectedAnswer);
    setEditingQuestionId(questionId);
  };

  const handleSave = async (questionId) => {
    try {
      const requestBody = {
        question: editedQuestion,
        expected_answer: editedAnswer,
      };

      const response = await fetch(
        `http://localhost:3001/api/subjects/${subjectName}/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save question and answer.");
      }

      const updatedQuestion = questions.find((q) => q.id === questionId);
      if (updatedQuestion) {
        updatedQuestion.question = editedQuestion;
        updatedQuestion.expected_answer = editedAnswer;
        setQuestions([...questions]);
      }

      setEditingQuestionId(null); // Exit editing mode
    } catch (error) {
      console.error("Error saving question and answer:", error);
    }
  };

  const handleCancel = () => {
    setEditingQuestionId(null); // Cancel editing mode
  };

  const handleQuestionChange = (event) => {
    setEditedQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setEditedAnswer(event.target.value);
  };

  const handleDelete = async (questionId) => {
    try {
      const deletedQuestionIndex = questions.findIndex(
        (question) => question.id === questionId
      );
      console.log(deletedQuestionIndex);
      const realDeletedId = realIds[deletedQuestionIndex];

      const response = await fetch(
        `http://localhost:3001/api/subjects/${subjectName}/${realDeletedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete question.");
      }

      const updatedQuestions = questions.filter(
        (question) => question.id !== questionId
      );
      const updatedRealIds = realIds.filter((id) => id !== realDeletedId);

      const reorderedQuestions = updatedQuestions.map((question, index) => ({
        ...question,
        id: index + 1, // Reorder the dummy serial number or ID
      }));
      setQuestions(reorderedQuestions);
      setRealIds(updatedRealIds);
      console.log("Deleted question real ID:", realDeletedId);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleAddQuestion = () => {
    setShowAddQuestionForm(true);
  };

  const handleAddNewQuestion = async () => {
    try {
      const requestBody = {
        question: newQuestion,
        expected_answer: newAnswer,
      };
      console.log(subjectName);

      const response = await fetch(
        `http://localhost:3001/api/subjects/${subjectName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new question.");
      }

      const responseData = await response.json();
      console.log(responseData);
      const addedQuestion = responseData.data;

      // Extract the real ID of the added question
      const newQuestionRealId = addedQuestion.id;
      console.log(newQuestionRealId + "kjafsdlfjaskdjf");

      // Calculate the UIId for the new question
      const lastQuestionUIId = uiIds.length > 0 ? uiIds[uiIds.length - 1] : 0;
      const newQuestionUIId = lastQuestionUIId + 1;

      // Update the UIIds and real IDs state with the new UIId and real ID
      setUiIds([...uiIds, newQuestionUIId]);
      setQuestions([
        ...questions,
        { ...addedQuestion, UIId: newQuestionUIId, realId: newQuestionRealId },
      ]);

      // Clear input fields and hide the modal
      setShowAddQuestionForm(false);
      setNewQuestion("");
      setNewAnswer("");
    } catch (error) {
      console.error("Error adding new question:", error);
    }
  };

  const handleRowClick = (index) => {
    const clickedQuestion = questions[index];
    if (clickedQuestion) {
      // Handle the click event here
      console.log("Clicked question:", clickedQuestion);
    }
  };

  return (
    <div>
      {!showAddQuestionForm && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={handleAddQuestion}
          style={{ marginTop: 10, marginBottom: 20 }}
        >
          Add Question
        </Button>
      )}

      <Modal
        open={showAddQuestionForm}
        onClose={() => setShowAddQuestionForm(false)}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "80%",
            maxWidth: "500px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "black",
            }}
          >
            Add New Question
          </h2>
          <TextareaAutosize
            placeholder="Enter question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            style={{
              width: "100%",
              marginBottom: 10,
              resize: "none",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            minRows={3}
            maxRows={10}
          />
          <TextareaAutosize
            placeholder="Enter expected answer..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            style={{
              width: "100%",
              marginBottom: 10,
              resize: "none",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            minRows={3}
            maxRows={10}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewQuestion}
            style={{ width: "100%" }}
          >
            Add
          </Button>
        </div>
      </Modal>

      <TableContainer component={Paper} style={{ borderRadius: 10 }}>
        <Table style={{ borderCollapse: "collapse", border: "2px solid #333" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: "2px solid #333" }}>No.</TableCell>

              <TableCell style={{ border: "2px solid #333" }}>
                Question
              </TableCell>
              <TableCell style={{ border: "2px solid #333" }}>
                Expected Answer
              </TableCell>
              <TableCell style={{ border: "2px solid #333" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((questionObj, index) => (
              <TableRow
                key={questionObj.id}
                style={{ border: "2px solid #333" }}
                onClick={() => handleRowClick(index)}
              >
                <TableCell style={{ border: "2px solid #333" }}>
                  {uiIds[index]}
                </TableCell>

                <TableCell style={{ border: "2px solid #333" }}>
                  {editingQuestionId === questionObj.id ? (
                    <TextareaAutosize
                      value={editedQuestion}
                      onChange={handleQuestionChange}
                      style={{
                        width: "100%",
                        border: "none",
                        resize: "none",
                        overflow: "hidden",
                      }}
                      minRows={1}
                      maxRows={10}
                    />
                  ) : (
                    questionObj.question
                  )}
                </TableCell>
                <TableCell style={{ border: "2px solid #333" }}>
                  {editingQuestionId === questionObj.id ? (
                    <TextareaAutosize
                      value={editedAnswer}
                      onChange={handleAnswerChange}
                      style={{
                        width: "100%",
                        border: "none",
                        resize: "none",
                        overflow: "hidden",
                      }}
                      minRows={1}
                      maxRows={10}
                    />
                  ) : (
                    questionObj.expected_answer
                  )}
                </TableCell>
                <TableCell style={{ border: "2px solid #333" }}>
                  {editingQuestionId === questionObj.id ? (
                    <>
                      <IconButton
                        onClick={() => handleSave(questionObj.id)}
                        color="primary"
                      >
                        <FaCheck />
                      </IconButton>
                      <IconButton onClick={handleCancel} color="primary">
                        <FaTimes />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() =>
                          handleEdit(
                            questionObj.id,
                            questionObj.question,
                            questionObj.expected_answer
                          )
                        }
                        color="primary"
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(questionObj.id)}
                        color="secondary"
                      >
                        <FaTrash />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SubjectQuestions;
