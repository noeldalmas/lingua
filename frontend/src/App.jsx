// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated import
import { Provider } from "react-redux";
import store from "./redux/store";

import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
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

import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Sidebar from "./components/Common/Sidebar";

import "./styles/main.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <div className="main-content">
            <Sidebar />
            <div className="content">
              <Routes>
                {" "}
                {/* Updated component */}
                <Route path="/" element={<LandingPage />} exact />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/courses" element={<CourseListingPage />} exact />
                <Route path="/courses/:id" element={<CourseDetailPage />} />
                <Route path="/lessons/:id" element={<LessonPage />} />
                <Route path="/quizzes/:id" element={<QuizPage />} />
                <Route path="/progress" element={<ProgressTrackingPage />} />
                <Route path="/forum" element={<CommunityForumPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/reset-password" element={<PasswordResetPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
