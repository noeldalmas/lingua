// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Lingua</h1>
        <p>Your platform for learning African languages</p>
        <Link to="/signup" className="cta-button">
          Get Started
        </Link>
      </header>
      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Interactive Lessons</h3>
            <p>Engage with interactive language lessons.</p>
          </div>
          <div className="feature-card">
            <h3>Progress Tracking</h3>
            <p>Track your learning progress with detailed analytics.</p>
          </div>
          <div className="feature-card">
            <h3>Community Forum</h3>
            <p>Join the community and discuss language learning.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
