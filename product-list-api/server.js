const express = require("express");
const app = express();
const fs = require("fs");

app.get("/api/products", (req, res) => {
  fs.readFile("./product.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      const products = JSON.parse(data);
      res.json(products);
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("The server is running at PORT: " + PORT);
});
