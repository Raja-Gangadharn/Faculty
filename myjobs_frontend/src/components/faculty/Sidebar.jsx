import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUserEdit, 
  FaGraduationCap, 
  FaBriefcase, 
  FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import '../../assets/faculty/Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const activeMenu = location.pathname.split('/')[2] || 'dashboard';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome className="me-2" />, path: '/faculty/dashboard' },
    { id: 'profile', label: 'My Profile', icon: <FaUserEdit className="me-2" />, path: '/faculty/profile' },
    { id: 'Tutorial', label: 'Tutorial', icon: <FaGraduationCap className="me-2" />, path: '/faculty/Tutorial' },
    { id: 'jobs', label: 'Job Opportunities', icon: <FaBriefcase className="me-2" />, path: '/faculty/jobs' },
  ];

  return (
    <div className="faculty-sidebar">
      <div className="sidebar-header">
        <h3>Faculty Finder</h3>
      </div>
      <div className="sidebar-menu">
        <Nav className="flex-column w-100">
          {menuItems.map((item) => (
            <Nav.Link 
              key={item.id}
              as={Link}
              to={item.path}
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </div>
      <div className="sidebar-footer">
        <button 
          className="btn btn-link text-start w-100 text-decoration-none text-white" 
          onClick={logout}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
