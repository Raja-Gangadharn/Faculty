import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LandingPage from "../pages/LandingPage"
import FacultyLogin from "../pages/faculty/FacultyLogin";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import ProfilePage from "../pages/faculty/profile/ProfilePage";
import FacultyRegistration from "../pages/faculty/FacultyRegistration";
import RecruiterLogin from "../pages/recruiter/RecruiterLogin";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard"
import RecruiterRegistration from "../pages/recruiter/RecruiterRegistration";
import FacultyLayout from "../layouts/FacultyLayout";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isFaculty, isLoading } = useContext(AuthContext);
  
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated || !isFaculty) {
    return <Navigate to="/faculty/login" replace />;
  }
  
  return children;
};

export const AppRoutes = () => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Faculty Auth Routes */}
      <Route path="/faculty/login" element={<FacultyLogin />} />
      <Route path="/faculty/register" element={<FacultyRegistration />} />
      
      <Route path="/faculty" element={<FacultyLayout />}>
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<ProfilePage />} />
        <Route path="tutorial" element={<div> Tutorial </div>} />
        <Route path="jobs" element={<div> Jobs </div>} />
      </Route>
      
      {/* Recruiter Routes */}
      <Route path="/recruiter/login" element={<RecruiterLogin />} />
      <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
      <Route path="/recruiter/registration" element={<RecruiterRegistration />} />
      
      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
