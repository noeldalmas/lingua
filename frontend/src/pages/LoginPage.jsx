// src/pages/LoginPage.jsx
import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import "../styles/main.css";

const LoginPage = () => {
  return (
    <div className="auth-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
