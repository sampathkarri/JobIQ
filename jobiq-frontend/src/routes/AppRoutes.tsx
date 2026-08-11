import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import OpportunitiesPage from "../pages/OpportunitiesPage";
import ApplicationsPage from "../pages/ApplicationsPage";
import ResumesPage from "../pages/ResumesPage";
import JobMatchesPage from "../pages/JobMatchesPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import InterviewPrepPage from "../pages/InterviewPrepPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/opportunities" element={<OpportunitiesPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/resumes" element={<ResumesPage />} />
      <Route path="/job-matches" element={<JobMatchesPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/interview-prep" element={<InterviewPrepPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
