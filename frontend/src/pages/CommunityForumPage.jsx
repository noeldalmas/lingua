// src/pages/CommunityForumPage.jsx
import React from "react";
import ForumList from "../components/Forum/ForumList";
import "../styles/main.css";

const CommunityForumPage = ({ posts }) => {
  return (
    <div className="community-forum-page">
      <h1>Community Forum</h1>
      <ForumList posts={posts} />
    </div>
  );
};

export default CommunityForumPage;
