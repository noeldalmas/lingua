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
import Dashboard from "./pages/Dashboard";

import "./styles/main.css";

const App = () => {
  // Access the current user from the authentication context
  const { user } = useAuthContext();

  return (
    // Wrap the application in a BrowserRouter to enable routing
    <BrowserRouter>
      <Routes>
        {/*If there's no user, render the Auth component. If there is a user, redirect to the dashboard */}
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                {/* Default landing page route */}
                <Route path="/" element={<LandingPage />} />
                {/* Dashboard route. Requires a user to be authenticated, otherwise redirects to the landing page */}
                <Route
                  path="/dashboard"
                  element={user ? <Dashboard /> : <Navigate to="/" />}
                />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
