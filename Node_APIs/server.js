const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const subjectRouter = require("./subjects/subject.routes");
const errors = require("./middleware/error");
const router = express.Router();
const app = express();
let activeUsers = 0;

const PORT = 3001;

const secretKey = "Hasti@522004";
const upload = multer({ dest: "uploads/" });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors.errorHandler);
app.use("/api/subjects", subjectRouter);
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jobprepai",
});
app.get("/tables", (req, res) => {
  connection.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'jobprepai' AND table_type = 'BASE TABLE';",
    (err, result) => {
      if (err) {
        console.error("Error retrieving table information:", err);
        res.status(500).json({
          error: "An error occurred while retrieving table information",
        });
      } else {
        const tables = result.map((row) => row.table_name);
        res.json({ tables });
      }
    }
  );
});
// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

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

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  activeUsers++;

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

      email: user.email,
      isadmin: user.isadmin,
    };

    // Passwords match, generate JWT token
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });

    console.log(`User logged in. Active users: ${activeUsers}`);

    res.status(200).json({ auth: true, token: token });

    console.log(token);
    next();
  });
});
app.get("/logout", (req, res) => {
  activeUsers = Math.max(activeUsers - 1, 0);
  console.log(`User logged out. Active users: ${activeUsers}`);
  res.send(`User logged out. Active users: ${activeUsers}`);
});

app.get("/api/active-users", (req, res) => {
  res.json({ activeUsers });
});

app.get("/api/:id", (req, res) => {
  const interviewId = req.params.id;
  const candidateId = 3;

  connection.query(
    "SELECT * FROM interview WHERE id = ? AND candidate_id = ?",
    [interviewId, candidateId],
    (err, results) => {
      if (err) {
        console.error("Error fetching interview details:", err);
        res.status(500).json({ error: "Failed to fetch interview details" });
        return;
      }
      console.log(results);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(results);
    }
  );
});
app.get("/api/answer/:id", (req, res) => {
  const interviewId = req.params.id;

  connection.query(
    "SELECT que_ans_list FROM interview WHERE id = ? ",
    [interviewId],
    (err, results) => {
      if (err) {
        console.error("Error fetching interview details:", err);
        res.status(500).json({ error: "Failed to fetch interview details" });
        return;
      }
      console.log(results);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(results);
    }
  );
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

  console.log("cid");
  console.log(cid);
  // Insert data into the interview table
  const query = `INSERT INTO interview (candidate_id, que_ans_list, subject_name, date_time) VALUES (?, ?, ?, ?)`;
  const values = [cid, que_ans_list, subject_name, new Date()];

  connection.query(query, values, (err, result) => {
    // Renamed res to result
    if (err) {
      console.error("Error inserting data into interview table: ", err);
      res.status(500).send("Error storing question responses");
      return;
    }
    console.log("Question responses stored successfully");
    res
      .status(200)
      .send("Question responses received and stored successfully.");
  });
});

// GET endpoint to fetch question by ID
app.get("/api/questions/:subject", (req, res) => {
  const Subject = req.params.subject;
  connection.query(
    "SELECT DISTINCT * FROM " + Subject + " ORDER BY RAND() LIMIT 10",

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
app.get("/api/candidate/:candidateId", (req, res) => {
  const candidateId = req.params.candidateId;
  connection.query(
    "SELECT * FROM interview WHERE candidate_id = ? ORDER BY id DESC",
    [candidateId],
    (err, results) => {
      if (err) {
        console.error("Error fetching interviews:", err);
        res.status(500).json({ error: "Failed to fetch interviews" });
        return;
      }
      console.log(results);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(results);
    }
  );
});

app.get("/api/answers/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT que_ans_list,scores FROM interview WHERE id = " + id,
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

app.get("/api/questionsforscore/:id/:subject", (req, res) => {
  const Id = req.params.id;
  const Subject = req.params.subject;
  connection.query(
    "SELECT question FROM " + Subject + " WHERE id = ?",
    [Id],
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
app.post("/api/upload", upload.single("image"), (req, res) => {
  const { filename, path: filePath } = req.file;
  const imageUrl = `http://localhost:3001/${filePath.replace(/\\/g, "/")}`;
  // Store image path in candidate table
  const candidateId = req.body.id; // Assuming you have a candidate ID in the request body
  const sql = "UPDATE candidate SET profile_pic_path = ? WHERE id = ?";
  connection.query(sql, [imageUrl, candidateId], (err, result) => {
    if (err) {
      console.error("Error updating profile picture path:", err);
      res.status(500).send("Error updating profile picture");
    } else {
      res.status(200).json({ imageUrl });
    }
  });
});
app.get("/gettotalinterviewsbyyear/:candidateId?", (req, res) => {
  const candidateId = req.params.candidateId;

  let sqlQuery;
  let sqlParams;

  if (candidateId) {
    // If candidateId is provided, filter interviews for that candidate
    sqlQuery =
      "SELECT YEAR(date_time) AS interview_year, COUNT(*) AS num_interview FROM interview WHERE candidate_id = ? GROUP BY YEAR(date_time) ORDER BY interview_year;";
    sqlParams = [candidateId];
  } else {
    // If no candidateId is provided, get total interviews for all candidates
    sqlQuery =
      "SELECT YEAR(date_time) AS interview_year, COUNT(*) AS num_interview FROM interview GROUP BY YEAR(date_time) ORDER BY interview_year;";
    sqlParams = [];
  }

  // Execute the SQL query
  connection.query(sqlQuery, sqlParams, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/getuniquesubjects/:candidateId", (req, res) => {
  // SQL query to get the number of interviews year-wise
  const candidateId = req.params.candidateId;
  const sqlQuery =
    "SELECT COUNT(DISTINCT subject_name) AS count FROM interview WHERE candidate_id = ?;";

  // Execute the SQL query
  connection.query(sqlQuery, [candidateId], (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});
app.get("/gettotalinterviews/:candidateId", (req, res) => {
  // SQL query to get the number of interviews year-wise
  const candidateId = req.params.candidateId;
  const sqlQuery =
    "SELECT COUNT(id) AS count FROM interview WHERE candidate_id = ?;";

  // Execute the SQL query
  connection.query(sqlQuery, [candidateId], (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});
app.get("/getinterviewcountbyrole/:candidateId/:subjectname", (req, res) => {
  const subject_name = req.params.subjectname;
  const candidateId = req.params.candidateId;
  const sqlQuery =
    "SELECT COUNT(*) AS count FROM interview WHERE candidate_id = ? AND subject_name = ?;";

  // Execute the SQL query
  connection.query(sqlQuery, [candidateId, subject_name], (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});
app.get("/totalusers", (req, res) => {
  const sqlQuery = "SELECT COUNT(id) AS count FROM Candidate;";

  // Execute the SQL query
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});
app.get("/totalinterview", (req, res) => {
  const sqlQuery = "SELECT COUNT(id) AS count FROM interview;";
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});
app.get("/totalsubjects", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = 'jobprepai' AND table_type = 'BASE TABLE' AND table_name NOT IN ('candidate', 'interview');";
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});
app.get("/admin/:subjectName", (req, res) => {
  const subjectName = req.params.subjectName;

  // Your database query
  const sqlQuery = `
    SELECT MAX(average_score) AS count 
    FROM interview 
    WHERE subject_name = ?
  `;

  connection.query(sqlQuery, [subjectName], (error, results, fields) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Extract the max_average_score from the result
    const count = results[0].count;

    // Send the max average score as the response
    res.json([{ count: count }]);
  });
});
app.get("/getaveragescoreline/:candidateId", (req, res) => {
  // SQL query to get the number of interviews year-wise
  const candidateId = req.params.candidateId;
  const sqlQuery =
    "SELECT date_time, average_score FROM interview WHERE candidate_id = ? ORDER BY date_time;";

  // Execute the SQL query
  connection.query(sqlQuery, [candidateId], (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = router;
