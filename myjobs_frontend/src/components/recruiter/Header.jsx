import React from 'react';
import { Container, Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/authService';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const handleLogout = () => {
    logout();
    navigate('/recruiter/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/recruiter/dashboard" className="d-flex align-items-center">
          <span className="fw-bold text-primary">FACULTY FINDER</span>
          <small className="ms-2 text-muted">By Applied Higher Ed</small>
        </Navbar.Brand>
        
        <Nav className="ms-auto align-items-center">
          <div className="me-3 text-muted">
            <i className="bi bi-clock me-1"></i>
            {currentTime}
          </div>
          
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center">
              <div className="me-2 d-none d-sm-block">
                <small className="d-block text-muted">Welcome,</small>
                <span className="fw-semibold">{user?.first_name || 'Recruiter'}</span>
              </div>
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                   style={{width: '40px', height: '40px'}}>
                <i className="bi bi-person-fill"></i>
              </div>
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/recruiter/profile">
                <i className="bi bi-person me-2"></i>Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/recruiter/settings">
                <i className="bi bi-gear me-2"></i>Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
