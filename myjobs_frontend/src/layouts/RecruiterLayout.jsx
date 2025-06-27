import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import Header from '../components/recruiter/Header';
import Sidebar from '../components/recruiter/Sidebar';
import '../pages/recruiter/recruiter.css';

const RecruiterLayout = () => {
  const { isCollapsed, isMobileOpen, toggleMobileSidebar } = useSidebar();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      toggleMobileSidebar(false);
    }
  }, [location.pathname, isMobile, toggleMobileSidebar]);

  // Redirect to dashboard if root recruiter route
  useEffect(() => {
    if (location.pathname === '/recruiter') {
      navigate('/recruiter/dashboard');
    }
  }, [location.pathname, navigate]);

  return (
    <div className={`d-flex ${isMobile ? 'mobile-view' : ''}`}>
      {/* Sidebar */}
      <div 
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'show' : ''}`}
        id="sidebar"
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile */}
      {isMobile && isMobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => toggleMobileSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div className="main-content">
        <Header />
        <main className="content-wrapper">
          <div className="container-fluid py-4">
            <Outlet />
          </div>
        </main>
        
        <footer className="dashboard-footer">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <span>© {new Date().getFullYear()} Faculty Recruitment Portal</span>
              <div className="d-flex gap-3">
                <a href="#" className="text-muted">Privacy</a>
                <a href="#" className="text-muted">Terms</a>
                <a href="#" className="text-muted">Help</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RecruiterLayout;