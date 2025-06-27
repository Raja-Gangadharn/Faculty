import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../services/authService';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/recruiter/Header';
import Sidebar from '../../components/recruiter/Sidebar';
import SearchSection from '../../components/recruiter/SearchSection';
import FacultyTable from '../../components/recruiter/FacultyTable';
import DashboardStats from '../../components/recruiter/DashboardStats';
import '../../pages/recruiter/recruiter.css';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFaculty: 0,
    activeFaculty: 0,
    recentApplications: 0,
    savedProfiles: 0,
    reviewedProfiles: 0
  });

  useEffect(() => {
    const { isAuthenticated, isRecruiter } = getUserRole();
    if (!isAuthenticated || !isRecruiter) {
      navigate('/recruiter/login');
    }

    // Simulate data fetching
    setTimeout(() => {
      setStats({
        totalFaculty: 1250,
        activeFaculty: 985,
        recentApplications: 45,
        savedProfiles: 28,
        reviewedProfiles: 15
      });
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar isCollapsed={isSidebarCollapsed} />
        
        <main className="flex-grow-1 overflow-auto p-3">
          <Container fluid className="py-3">
            <Row>
              <Col xs={12}>
                <h2 className="mb-4">Welcome to Faculty Finder</h2>
              </Col>
            </Row>

            <DashboardStats stats={stats} />

            <Row>
              <Col xs={12}>
                <SearchSection />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <FacultyTable loading={loading} />
              </Col>
            </Row>
          </Container>
          
          <footer className="mt-auto py-3 text-center text-muted small border-top">
            <div>
              <div className="d-flex justify-content-center gap-3 mb-3">
                <a href="#" className="text-decoration-none text-muted">
                  <i className="bi bi-github me-1"></i> GitHub
                </a>
                <a href="#" className="text-decoration-none text-muted">
                  <i className="bi bi-twitter me-1"></i> Twitter
                </a>
                <a href="#" className="text-decoration-none text-muted">
                  <i className="bi bi-linkedin me-1"></i> LinkedIn
                </a>
              </div>
              <div>
                &copy; {new Date().getFullYear()} © AHF Solutions. All Rights Reserved.
                {' | '}
                <a href="https://ahfsolutions.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none ms-1">
                  Visit AHF Solutions
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
