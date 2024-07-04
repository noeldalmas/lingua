// Updated EditProfile.jsx to include all editable fields from the model
import React, { useState } from "react";
import "../../styles/main.css";

const EditProfile = ({ user, onSave }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [preferredLanguages, setPreferredLanguages] = useState(
    user.preferences.preferredLanguages.join(", ")
  );
  const [level, setLevel] = useState(user.preferences.level);
  const [emailNotifications, setEmailNotifications] = useState(
    user.preferences.notifications.email
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      firstName,
      lastName,
      email,
      password: password !== "" ? password : undefined, // Only update password if a new one is provided
      preferences: {
        preferredLanguages: preferredLanguages
          .split(",")
          .map((lang) => lang.trim()),
        level,
        notifications: {
          email: emailNotifications,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <h2>Edit Profile</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (leave blank to keep current password)"
        />
      </div>
      <div className="form-group">
        <label htmlFor="preferredLanguages">Preferred Languages</label>
        <input
          type="text"
          id="preferredLanguages"
          value={preferredLanguages}
          onChange={(e) => setPreferredLanguages(e.target.value)}
          placeholder="Comma separated, e.g., English, Spanish"
        />
      </div>
      <div className="form-group">
        <label htmlFor="level">Level</label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
          Email Notifications
        </label>
      </div>
      <button type="submit" className="btn-submit">
        Save Changes
      </button>
    </form>
  );
};

export default EditProfile;
