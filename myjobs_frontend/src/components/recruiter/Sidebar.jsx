import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { to: '/recruiter/dashboard', icon: 'bi-search', label: 'Faculty Finder' },
    { to: '/recruiter/saved', icon: 'bi-bookmark', label: 'Saved Profiles' },
    { to: '/recruiter/reviewed', icon: 'bi-check-circle', label: 'Mark as Reviewed Profiles' },
    { to: '/recruiter/tutorial', icon: 'bi-play-circle', label: 'Tutorial' },
    { to: '/recruiter/contact', icon: 'bi-envelope', label: 'Contact Us' },
    { to: '/recruiter/feedback', icon: 'bi-chat-left-text', label: 'Feedback' },
  ];

  return (
    <div className="bg-white h-100 border-end" style={{ width: '250px' }}>
      <div className="p-3 border-bottom">
        <h5 className="text-uppercase fw-bold text-primary mb-0">FACULTY FINDER</h5>
      </div>
      
      <Nav className="flex-column p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `nav-link d-flex align-items-center py-2 mb-1 rounded ${isActive ? 'bg-light text-primary' : 'text-dark'}`
            }
          >
            <i className={`bi ${item.icon} me-3`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
