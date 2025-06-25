import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Container, Button, Offcanvas } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/faculty/Sidebar';
import TopNavbar from '../components/faculty/TopNavbar';
import Footer from '../components/faculty/Footer';
import '../assets/faculty/Sidebar.css';
import '../assets/faculty/TopNavbar.css';
import '../assets/faculty/Footer.css';

const FacultyLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isFaculty, isLoading } = useAuth();

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Handle responsive sidebar toggle
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show content if authenticated and faculty
  if (isAuthenticated && isFaculty) {
    return (
      <div className="d-flex flex-column min-vh-100">
        {/* Mobile Header with Toggle Button */}
        <div className="d-lg-none bg-white p-3 d-flex align-items-center">
          <Button 
            variant="link" 
            className="text-dark p-0 me-3" 
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </Button>
          <h5 className="mb-0">Faculty Dashboard</h5>
        </div>
        
        {/* Sidebar Overlay for Mobile */}
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} 
          onClick={toggleSidebar}
        />
        
        <div className="d-flex flex-grow-1">
          {/* Sidebar */}
          <aside className={`faculty-sidebar ${sidebarOpen ? 'show' : ''}`}>
            <Sidebar />
          </aside>
          
          {/* Main Content */}
          <div className="main-content flex-grow-1 d-flex flex-column">
            {/* Top Navigation */}
            <TopNavbar />
            
            {/* Page Content */}
            <div className="content-wrapper flex-grow-1 p-3 p-lg-4">
              <Outlet />
            </div>
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !isFaculty) {
    return <Navigate to="/faculty/login" replace />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Mobile Header with Toggle Button */}
      <div className="d-lg-none bg-white p-3 d-flex align-items-center">
        <Button
          variant="link"
          className="text-dark p-0 me-3"
          onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </Button>
        <h5 className="mb-0">Faculty Dashboard</h5>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={toggleSidebar}
      />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className={`faculty-sidebar ${sidebarOpen ? 'show' : ''}`}>
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="main-content flex-grow-1 d-flex flex-column">
          {/* Top Navigation */}
          <TopNavbar />

          {/* Page Content */}
          <div className="content-wrapper flex-grow-1 p-3 p-lg-4">
            <Outlet />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default FacultyLayout;