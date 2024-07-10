// /src/App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Learn from "./pages/Learn";
import Tutors from "./pages/Tutors";
import Community from "./pages/Community";
import NavBar from "./components/NavBar";
import Settings from "./pages/Settings";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup/*" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/community" element={<Community />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
