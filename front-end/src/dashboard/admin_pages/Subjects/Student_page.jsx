import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useNavigate } from "react-router-dom";

const CandidateTable = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null); // Define id state

  const redirectToPage = (id) => {
    setId(id);
    navigate(`/scores/${id}`);
  };
  const [candidates, setCandidates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/candidate");
        const data = await response.json();
        console.log(data);
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id, username, description) => {
    // Set the editing ID and initialize edited values
    setEditingId(id);
    setEditedUsername(username);
    setEditedDescription(description);
  };

  const handleSave = async (id) => {
    try {
      // Update the candidate with the edited values
      const response = await fetch(
        `http://localhost:8080/api/candidate/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: editedUsername,
            description: editedDescription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save candidate.");
      }

      // Update the local candidates list
      const updatedCandidates = candidates.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              username: editedUsername,
              description: editedDescription,
            }
          : candidate
      );
      setCandidates(updatedCandidates);

      // Reset editing state
      setEditingId(null);
      setEditedUsername("");
      setEditedDescription("");
    } catch (error) {
      console.error("Error saving candidate:", error);
    }
  };

  const handleCancel = () => {
    // Reset editing state
    setEditingId(null);
    setEditedUsername("");
    setEditedDescription("");
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log("Deleting candidate with ID:", id);
  };

  const handleRedirect = (id) => {
    // Handle redirect action
    redirectToPage(id);
    console.log("Redirecting to candidate with ID:", id);
  };

  const handleRowClick = (row) => {
    console.log("Clicked row:", row);
  };

  return (
    <TableContainer component={Paper} style={{ borderRadius: 10 }}>
      <Table style={{ borderCollapse: "collapse", border: "2px solid #333" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ border: "2px solid #333" }}>ID</TableCell>
            <TableCell style={{ border: "2px solid #333" }}>Email</TableCell>
            <TableCell style={{ border: "2px solid #333" }}>Username</TableCell>
            <TableCell style={{ border: "2px solid #333" }}>
              First Name
            </TableCell>
            <TableCell style={{ border: "2px solid #333" }}>
              Last Name
            </TableCell>
            <TableCell style={{ border: "2px solid #333" }}>
              Description
            </TableCell>
            <TableCell style={{ border: "2px solid #333" }}>
              Github Link
            </TableCell>
            <TableCell style={{ border: "2px solid #333" }}>
              LinkedIn Link
            </TableCell>

            <TableCell style={{ border: "2px solid #333" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow
              key={candidate.id}
              style={{ border: "2px solid #333" }}
              onClick={() => handleRowClick(candidate)}
            >
              <TableCell style={{ border: "2px solid #333" }}>
                {candidate.id}
              </TableCell>
              <TableCell style={{ border: "2px solid #333" }}>
                {candidate.email}
              </TableCell>
              <TableCell style={{ border: "2px solid #333" }}>
                {editingId === candidate.id ? (
                  <TextareaAutosize
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    style={{ width: "100%" }}
                  />
                ) : (
                  candidate.username
                )}
              </TableCell>
              <TableCell style={{ border: "2px solid #333" }}>
                {candidate.firstName}
              </TableCell>
              <TableCell style={{ border: "2px solid #333" }}>
                {candidate.lastName}
              </TableCell>
              <TableCell style={{ border: "2px solid #333" }}>
                {editingId === candidate.id ? (
                  <TextareaAutosize
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    style={{ width: "100%" }}
                  />
                ) : (
                  candidate.description
                )}
              </TableCell>
              <TableCell style={{ border: "2px solid #333" }}>
                {candidate.githubLink}
              </TableCell>
              <TableCell style={{ border: "2px solid #333" }}>
                {candidate.linkedinLink}
              </TableCell>

              <TableCell
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                {editingId === candidate.id ? (
                  <>
                    <IconButton
                      onClick={() => handleSave(candidate.id)}
                      color="primary"
                    >
                      Save
                    </IconButton>
                    <IconButton onClick={handleCancel} color="secondary">
                      Cancel
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      onClick={() =>
                        handleEdit(
                          candidate.id,
                          candidate.username,
                          candidate.description
                        )
                      }
                      color="primary"
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(candidate.id)}
                      color="secondary"
                    >
                      <FaTrash />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRedirect(candidate.id)}
                      style={{ color: "green" }}
                    >
                      <FaArrowRight />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CandidateTable;
