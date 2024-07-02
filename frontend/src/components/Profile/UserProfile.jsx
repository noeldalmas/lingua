// src/components/Profile/UserProfile.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/selectors/authSelectors";
import "../../styles/main.css";

const UserProfile = () => {
  const user = useSelector(selectAuthUser);

  return (
    <div className="user-profile">
      <h2>Profile Information</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
};

export default UserProfile;
