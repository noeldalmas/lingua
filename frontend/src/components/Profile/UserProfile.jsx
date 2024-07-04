// Updated UserProfile.jsx
import React from "react";
import "../../styles/main.css";
import { useUserProfile } from "../../hooks/useUserProfile";

const UserProfile = () => {
  const user = useUserProfile();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>Profile Information</h2>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Preferred Languages:</strong>{" "}
        {user.preferences.preferredLanguages.join(", ")}
      </p>
      <p>
        <strong>Preferred Genres:</strong>{" "}
        {user.preferences.preferredGenres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <strong>Level:</strong> {user.preferences.level}
      </p>
      <p>
        <strong>Email Notifications:</strong>{" "}
        {user.preferences.notifications.email ? "Enabled" : "Disabled"}
      </p>
    </div>
  );
};

export default UserProfile;
