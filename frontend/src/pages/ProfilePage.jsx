// src/pages/ProfilePage.jsx
import React from "react";
import UserProfile from "../components/Profile/UserProfile";
import EditProfile from "../components/Profile/EditProfile";
import "../styles/main.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <UserProfile />
      <EditProfile />
    </div>
  );
};

export default ProfilePage;
