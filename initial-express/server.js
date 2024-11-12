const express = require("express");
const app = express();

app.get("/api/students", function (req, res) {
  // parameters >> url, callback function()
  const data = [
    { id: 1, name: "John", age: 19, job: "student" },
    { id: 2, name: "Josep", age: 21, job: "student" },
    { id: 3, name: "Lydia", age: 18, job: "student" },
    { id: 4, name: "William", age: 17, job: "student" },
  ];
  return res.status(200).json(data);
});

const PORT = 7000;
app.listen(PORT, function () {
  console.log("Server is running at PORT: ", PORT);
});

// app တွင် method နှစ်ခုသုံးထား >> get(), listen()
// command line to run code >> node server.js
