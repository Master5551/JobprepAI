import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { SortByAlpha, SortByAlphaOutlined } from "@mui/icons-material";
import { FiEye } from "react-icons/fi"; // Importing Eye icon from react-icons

export default function ScoreTable() {
  let userId;
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [showEntries, setShowEntries] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(""); // State to store the sort column
  const [sortOrder, setSortOrder] = useState("asc"); // State to store the sort order
  const { id } = useParams();
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded JWT token:", decodedToken);
    userId = decodedToken.id;
    console.log("Decoded:", decodedToken);
  } else {
    console.error("JWT token not found in local storage.");
  }

  useEffect(() => {
    fetchInterviews();
    fetchSubjects();
  }, [id]);

  const fetchInterviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/candidate/${userId}`
      );
      const data = await response.json();

      const extractedData = data.map(
        ({ id, subject_name, scores, date_time }) => ({
          id,
          subject_name,
          scores,
          date_time: new Date(date_time),
        })
      );
      console.log(extractedData + "exdata");

      setInterviews(extractedData);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:3001/tables");
      const data = await response.json();
      console.log(data.tables);

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

  const handleEntriesChange = (event) => {
    setShowEntries(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleViewAnswer = (interviewId, subjectName) => {
    try {
      navigate(`/answer`, { state: { id: interviewId, subject: subjectName } });
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Select
          value={selectedSubject}
          onChange={handleSubjectChange}
          variant="outlined"
          style={{ minWidth: 150, marginRight: 10 }}
        >
          {menuItems}
        </Select>
        <Select
          value={showEntries}
          onChange={handleEntriesChange}
          variant="outlined"
          style={{ minWidth: 150 }}
        >
          <MenuItem value={5}>5 entries</MenuItem>
          <MenuItem value={10}>10 entries</MenuItem>
          <MenuItem value={15}>15 entries</MenuItem>
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
        <TableContainer
          component={Paper}
          style={{ marginTop: 40, border: "2px solid black" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    cursor: "pointer",
                    borderRight: "2px solid black", // Add vertical border line
                    borderBottom: "2px solid black", // Add horizontal border line
                    fontWeight: "bolder",
                    textAlign: "center", // Center the icon
                  }}
                  onClick={() => handleSort("id")}
                >
                  Interview ID
                  {sortColumn === "id" ? (
                    sortOrder === "asc" ? (
                      <SortByAlpha />
                    ) : (
                      <SortByAlphaOutlined />
                    )
                  ) : null}
                </TableCell>
                <TableCell
                  style={{
                    cursor: "pointer",
                    borderRight: "2px solid black", // Add vertical border line
                    borderBottom: "2px solid black", // Add horizontal border line
                    fontWeight: "bolder",
                    textAlign: "center", // Center the icon
                  }}
                  onClick={() => handleSort("subject_name")}
                >
                  Subject Name
                  {sortColumn === "subject_name" ? (
                    sortOrder === "asc" ? (
                      <SortByAlpha />
                    ) : (
                      <SortByAlphaOutlined />
                    )
                  ) : null}
                </TableCell>
                <TableCell
                  style={{
                    cursor: "pointer",
                    borderRight: "2px solid black", // Add vertical border line
                    borderBottom: "2px solid black", // Add horizontal border line
                    fontWeight: "bolder",
                    textAlign: "center", // Center the icon
                  }}
                  onClick={() => handleSort("date_time")}
                >
                  Date Time
                  {sortColumn === "date_time" ? (
                    sortOrder === "asc" ? (
                      <SortByAlpha />
                    ) : (
                      <SortByAlphaOutlined />
                    )
                  ) : null}
                </TableCell>
                <TableCell
                  style={{
                    cursor: "pointer",
                    borderRight: "2px solid black", // Add vertical border line
                    borderBottom: "2px solid black", // Add horizontal border line
                    fontWeight: "bolder",
                    textAlign: "center", // Center the icon
                    width: "80px",
                  }}
                >
                  View Answer
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interviews
                .filter(
                  (interview) =>
                    !selectedSubject ||
                    interview.subject_name === selectedSubject
                )
                .sort((a, b) => {
                  if (sortColumn === "id") {
                    return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
                  } else if (sortColumn === "subject_name") {
                    return sortOrder === "asc"
                      ? a.subject_name.localeCompare(b.subject_name)
                      : b.subject_name.localeCompare(a.subject_name);
                  } else if (sortColumn === "date_time") {
                    return sortOrder === "asc"
                      ? a.date_time - b.date_time
                      : b.date_time - a.date_time;
                  }
                  return 0;
                })
                .slice(
                  (currentPage - 1) * showEntries,
                  currentPage * showEntries
                )
                .map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell
                      style={{
                        borderRight: "2px solid black", // Add vertical border line
                        borderBottom: "2px solid black", // Add horizontal border line
                        textAlign: "center",
                        width: "25px",
                      }}
                    >{` ${interview.id}`}</TableCell>
                    <TableCell
                      style={{
                        borderRight: "2px solid black", // Add vertical border line
                        borderBottom: "2px solid black", // Add horizontal border line
                        textAlign: "center",
                      }}
                    >
                      {interview.subject_name}
                    </TableCell>
                    <TableCell
                      style={{
                        borderRight: "2px solid black", // Add vertical border line
                        borderBottom: "2px solid black", // Add horizontal border line
                        textAlign: "center",
                      }}
                    >
                      {new Date(interview.date_time).toLocaleString()}
                    </TableCell>
                    <TableCell
                      style={{
                        borderRight: "2px solid black", // Add vertical border line

                        borderBottom: "2px solid black", // Add horizontal border line
                      }}
                    >
                      <IconButton
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onClick={() =>
                          handleViewAnswer(interview.id, interview.subject_name)
                        }
                      >
                        <FiEye />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {interviews.length > showEntries && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          {Array.from(
            { length: Math.ceil(interviews.length / showEntries) },
            (_, i) => (
              <span
                key={i}
                style={{
                  marginRight: 5,
                  cursor: "pointer",
                  textDecoration: currentPage === i + 1 ? "underline" : "none",
                  padding: "5px", // Add padding for the rectangle
                  border: "2px solid black",
                  borderRadius: "4px",
                  display: "inline-block",
                  transition: "background-color 0.3s",
                  color: "black",
                }}
                onClick={() => handlePageChange(i + 1)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "blue";
                }} // Change background color on hover
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "initial";
                }} // Reset background color on hover out
              >
                {i + 1}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
