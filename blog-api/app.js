const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const posts = require("./posts");

const app = express();

// Middleware
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// GET route to display all posts
app.get("/posts", (req, res) => {
  const allPosts = posts.getPosts(); // Get all posts
  res.render("posts", { posts: allPosts }); // Render posts.ejs with posts data
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

// Browser မှာ URL ထည့်ပါ >>> http://localhost:3000/posts
