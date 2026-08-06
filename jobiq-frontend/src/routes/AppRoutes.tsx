import { Route, Routes } from "react-router-dom";

import ApplicationsPage from "../pages/ApplicationsPage";
import HomePage from "../pages/HomePage";
import JobMatchesPage from "../pages/JobMatchesPage";
import NotFoundPage from "../pages/NotFoundPage";
import OpportunitiesPage from "../pages/OpportunitiesPage";
import ProfilePage from "../pages/ProfilePage";
import ResumesPage from "../pages/ResumesPage";
import SavedOpportunitiesPage from "../pages/SavedOpportunitiesPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/opportunities" element={<OpportunitiesPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/resumes" element={<ResumesPage />} />
      <Route path="/job-matches" element={<JobMatchesPage />} />
      <Route path="/saved-opportunities" element={<SavedOpportunitiesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;

