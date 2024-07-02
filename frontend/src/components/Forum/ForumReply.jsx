// src/components/Forum/ForumReply.jsx
import React, { useState } from "react";
import "../../styles/main.css";

const ForumReply = ({ postId, onReply }) => {
  const [reply, setReply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onReply(postId, reply);
    setReply("");
  };

  return (
    <form onSubmit={handleSubmit} className="forum-reply">
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write your reply..."
        required
      />
      <button type="submit">Reply</button>
    </form>
  );
};

export default ForumReply;
