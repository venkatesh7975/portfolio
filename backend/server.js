const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "portfolio", // Change this to your database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Example endpoint for handling contact form submission
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Example: Insert data into a MySQL table
  const sql = "INSERT INTO inbox (name, email, message) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(500).send("Error submitting message");
      return;
    }
    console.log("Message submitted successfully");
    res.status(200).send("Message submitted successfully");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
