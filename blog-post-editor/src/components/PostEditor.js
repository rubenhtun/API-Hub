import React, { useState } from "react";
import "../PostEditor.css";

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleImageUpload = (e) => {
    setImage(() => e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content, image };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <div className="post-editor-container">
      <h1>Create a Blog Post</h1>
      <form className="post-editor-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <label>Image</label>
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose File
        </label>
        <input id="file-upload" type="file" onChange={handleImageUpload} />
        <button type="submit">Post</button>
      </form>

      <h1>Blog Posts</h1>
      <div>
        {posts.map((post, index) => (
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && (
              <img src={URL.createObjectURL(post.image)} alt="Post" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostEditor;
