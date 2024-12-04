const express = require("express");
const app = express();

// GET Method
app.get("/developers/", (req, res) =>
  res.json({
    name: "Ruben Htun",
    age: 21,
    occupation: "Web Developer",
  })
);

// POST Method
app.post("developers/", (req, res) => {
  res.json({
    name: "Ruben Htun",
    age: 21,
    occupation: "Computer Science Student",
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// Command Line --> node server.js

// to check it through using postman software application
