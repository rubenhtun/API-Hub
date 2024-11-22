const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

app.use(cors());

app.get("/food", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const food = JSON.parse(data);
      res.json(food);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
