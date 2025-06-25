import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/faculty/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="faculty-footer mt-auto py-3 bg-light">
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {currentYear} Faculty Finder. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">
              <a href="/privacy-policy" className="text-decoration-none me-3">Privacy Policy</a>
              <a href="/terms" className="text-decoration-none me-3">Terms of Service</a>
              <a href="/contact" className="text-decoration-none">Contact Us</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
