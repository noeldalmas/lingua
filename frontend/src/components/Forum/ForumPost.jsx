// src/components/Forum/ForumPost.jsx
import React from "react";
import "../../styles/main.css";

const ForumPost = ({ post }) => {
  return (
    <div className="forum-post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
};

export default ForumPost;
