// src/pages/PasswordResetPage.jsx
import React, { useState } from "react";
import "../styles/main.css";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to reset password
    setMessage(
      "If an account with that email exists, you will receive a password reset email shortly."
    );
  };

  return (
    <div className="password-reset-page">
      <form onSubmit={handleSubmit} className="password-reset-form">
        <h2>Reset Password</h2>
        {message && <div className="message">{message}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordResetPage;
