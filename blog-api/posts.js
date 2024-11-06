let posts = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
  { id: 3, title: "Third Post", content: "This is the third post." },
];

// Starting ID for posts
let currentId = 1;

// Get all posts
getPosts = () => {
  return posts;
};

module.exports = {
  getPosts,
};
