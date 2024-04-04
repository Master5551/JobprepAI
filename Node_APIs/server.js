const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql"); // Import the mysql module
const router = express.Router();
const authenticate = require('../middleware/authenticate');
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

router.get('/protected', authenticate, (req, res) => {
  // User is authenticated, you can access req.userId to get user ID
  const userId = req.userId;
  res.json({ message: 'Protected route accessed', userId: userId });
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
    // Passwords match, generate JWT token
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ auth: true, token: token });

    console.log(token);
  });
});

// POST endpoint to handle transcript data
app.post("/api/questionResponses", (req, res) => {
  const questionResponses = req.body;

  // Print the received map data
  console.log("Received question responses:");
  console.log(questionResponses);
  // Stringify questionResponses to store in que_ans_list
  const que_ans_list = JSON.stringify(questionResponses);

  // Insert data into the interview table
  const query = `INSERT INTO interview (candidate_id, que_ans_list, subject_name, date_time) VALUES (?, ?, ?, ?)`;
  const values = ['1', que_ans_list, 'Algorithm', new Date()];

  connection.query(query, values, (err, res) => {
    if (err) {
      console.error('Error inserting data into interview table: ', err);
      res.status(500).send('Error storing question responses');
      return;
    }
    console.log('Question responses stored successfully');
    res.status(200).send('Question responses received and stored successfully.');
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;