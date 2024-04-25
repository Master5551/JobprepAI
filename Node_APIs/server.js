const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql"); // Import the mysql module
<<<<<<< HEAD
const jwt = require("jsonwebtoken");
=======
const jwt = require('jsonwebtoken');
>>>>>>> c87e8289b4dd53f06a9d1c5b524df5f774bbee5e
const router = express.Router();
const app = express();
const PORT = 3001;
const secretKey = "Hasti@522004";
// Middleware
app.use(cors());
app.use(bodyParser.json());
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

// POST endpoint to verify token
app.post("/verifyToken", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    // Token is valid
    console.log("Token decoded:", decoded);
    res.status(200).json({ message: "Token verified successfully", decoded });
  });
});

<<<<<<< HEAD
=======

>>>>>>> c87e8289b4dd53f06a9d1c5b524df5f774bbee5e
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Query to find user by email
  const query = "SELECT * FROM candidate WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    console.log(results);
    // Check if user exists
    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    // User found, compare passwords
    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(email);
    console.log(password);

    const tokenPayload = {
      id: user.id,
<<<<<<< HEAD
      email: user.email, // Add email to the token payload
=======
      email: user.email  // Add email to the token payload
>>>>>>> c87e8289b4dd53f06a9d1c5b524df5f774bbee5e
    };
    // Passwords match, generate JWT token
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });
    res.status(200).json({ auth: true, token: token });

    console.log(token);
  });
});

// POST endpoint to handle transcript data
app.post("/api/questionResponses", (req, res) => {
  const { questionResponses, candidate_id, subject_name } = req.body;

  // Print the received map data
  console.log("Received question responses:");
  console.log(questionResponses);
  console.log(candidate_id);
  // Stringify questionResponses to store in que_ans_list
  const que_ans_list = JSON.stringify(questionResponses);
  const cid = JSON.stringify(candidate_id);
  const subjectname = JSON.stringify(subject_name);
  console.log("cid");
  console.log(cid);
  // Insert data into the interview table
<<<<<<< HEAD
  const query = ` INSERT INTO interview (candidate_id, que_ans_list, subject_name, date_time) VALUES (1, ?, ?, ?)`;
  const values = [que_ans_list, subjectname, new Date()];

  connection.query(query, values, (err, res) => {
    if (err) {
      console.error("Error inserting data into interview table: ", err);
      res.status(500).send("Error storing question responses");
      return;
    }
    console.log("Question responses stored successfully");
=======
  const query = `INSERT INTO interview (candidate_id, que_ans_list, subject_name, date_time) VALUES (?, ?, ?, ?)`;
  const values = [cid, que_ans_list, subjectname, new Date()];

  connection.query(query, values, (err, res) => {
    if (err) {
      console.error('Error inserting data into interview table: ', err);
      res.status(500).send('Error storing question responses');
      return;
    }
    console.log('Question responses stored successfully');
>>>>>>> c87e8289b4dd53f06a9d1c5b524df5f774bbee5e
    // res.status(200).send('Question responses received and stored successfully.');
  });
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
app.get("/api/details", (req, res) => {
  connection.query(
    "SELECT * FROM interview WHERE candidate_id = 1 ORDER BY id DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ error: "Failed to fetch questions" });
        return;
      }
      console.log(results);
      res.setHeader("Content-Type", "application/json"); // Set content type to JSON
      res.status(200).json(results);
    }
  );
});
app.get("/api/answers/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT que_ans_list FROM interview WHERE id = " + id,
    (err, results) => {
      if (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ error: "Failed to fetch questions" });
        return;
      }
      console.log(results);
      res.setHeader("Content-Type", "application/json"); // Set content type to JSON
      res.status(200).json(results);
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
<<<<<<< HEAD
module.exports = router;
=======

module.exports = router;
>>>>>>> c87e8289b4dd53f06a9d1c5b524df5f774bbee5e
