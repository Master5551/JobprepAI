const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql"); // Import the mysql module

const app = express();
const PORT = 3001;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jobprepai",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to handle transcript data
app.post("/api/questionResponses", (req, res) => {
  const questionResponses = req.body;

  // Print the received map data
  console.log("Received question responses:");
  console.log(questionResponses);

  // Send a response
  res.status(200).send("Question responses received successfully.");
});

// GET endpoint to fetch question by ID
app.get("/api/questions/:startId/:endId/:subject", (req, res) => {
  const startId = req.params.startId;
  const endId = req.params.endId;
  const Subject = req.params.subject;
  connection.query(
    "SELECT * FROM " +
      Subject +
      " WHERE id BETWEEN ? AND ? ORDER BY RAND() LIMIT 10",
    [startId, endId],
    (err, results) => {
      if (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ error: "Failed to fetch questions" });
        return;
      }
      res.status(200).json(results);
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
