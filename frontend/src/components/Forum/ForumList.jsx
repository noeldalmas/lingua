// src/components/Forum/ForumList.jsx
import React from "react";
import ForumPost from "./ForumPost";
import "../../styles/main.css";

const ForumList = ({ posts }) => {
  return (
    <div className="forum-list">
      {posts.map((post) => (
        <ForumPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ForumList;
