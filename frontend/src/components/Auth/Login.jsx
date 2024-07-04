import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const LogIn = ({ setShowLogIn }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading} className="login-btn">
          Login
        </button>
        {error && <p className="red">{error}</p>}
      </form>
      <p>Don't have account?</p>
      <span className="signup-btn-login" onClick={() => setShowLogIn(false)}>
        Sign Up
      </span>
    </div>
  );
};

export default LogIn;
