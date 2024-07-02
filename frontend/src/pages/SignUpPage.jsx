// src/pages/SignUpPage.jsx
import React from "react";
import SignUpForm from "../components/Auth/SignUpForm";
import "../styles/main.css";

const SignUpPage = () => {
  return (
    <div className="auth-page">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
