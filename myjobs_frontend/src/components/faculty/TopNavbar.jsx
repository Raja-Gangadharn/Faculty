import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { FaBell, FaEnvelope, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import '../../assets/faculty/TopNavbar.css';

const TopNavbar = () => {
  const { firstName, lastName, email } = useAuth();
  const userInitials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();

  return (
    <Navbar bg="light" expand="lg" className="top-navbar">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link className="position-relative me-3">
              <FaBell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </Nav.Link>
            <Nav.Link className="position-relative me-3">
              <FaEnvelope size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                5
              </span>
            </Nav.Link>
            <div className="user-profile d-flex align-items-center">
              <div className="avatar me-2 bg-primary text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '36px', height: '36px' }}>
                {userInitials || <FaUser size={16} />}
              </div>
              <div className="d-none d-md-flex flex-column">
                <span className="fw-bold">{`${firstName || ''} ${lastName || ''}`.trim() || 'User'}</span>
                <small className="text-muted" style={{ fontSize: '0.8rem' }}>{email || ''}</small>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
