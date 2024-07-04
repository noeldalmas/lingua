// src/App.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom"; // Updated import
import { useAuthContext } from "./hooks/useAuthContext";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import CourseListingPage from "./pages/CourseListingPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import ProgressTrackingPage from "./pages/ProgressTrackingPage";
import CommunityForumPage from "./pages/CommunityForumPage";
import ProfilePage from "./pages/ProfilePage";
import PasswordResetPage from "./pages/PasswordResetPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import HelpPage from "./pages/HelpPage";
import ContactUsPage from "./pages/ContactUsPage";
import Auth from "./pages/Auth";

import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Sidebar from "./components/Common/Sidebar";

import "./styles/main.css";

const App = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />
        <Route path="*" element={
          <>
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/" />} />
              <Route path='courses' element={<CourseListingPage />} />
            </Routes>
            <Footer />
          </>
        } />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
