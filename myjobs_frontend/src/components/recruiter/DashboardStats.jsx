import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const DashboardStats = ({ stats = {} }) => {
  const defaultStats = {
    totalFaculty: 0,
    activeFaculty: 0,
    recentApplications: 0,
    savedProfiles: 0,
    reviewedProfiles: 0
  };

  const statsData = {
    totalFaculty: {
      icon: <i className="bi bi-people-fill text-primary" style={{ fontSize: '1.5rem' }} />,
      label: 'Total Faculty',
      value: stats.totalFaculty || defaultStats.totalFaculty,
      description: 'Total registered faculty members'
    },
    activeFaculty: {
      icon: <i className="bi bi-clock-fill text-success" style={{ fontSize: '1.5rem' }} />,
      label: 'Active Faculty',
      value: stats.activeFaculty || defaultStats.activeFaculty,
      description: 'Currently active profiles'
    },
    recentApplications: {
      icon: <i className="bi bi-book-fill text-info" style={{ fontSize: '1.5rem' }} />,
      label: 'Recent Applications',
      value: stats.recentApplications || defaultStats.recentApplications,
      description: 'Last 30 days'
    },
    savedProfiles: {
      icon: <i className="bi bi-building text-warning" style={{ fontSize: '1.5rem' }} />,
      label: 'Saved Profiles',
      value: stats.savedProfiles || defaultStats.savedProfiles,
      description: 'In your shortlist'
    },
    reviewedProfiles: {
      icon: <i className="bi bi-award-fill text-danger" style={{ fontSize: '1.5rem' }} />,
      label: 'Reviewed Profiles',
      value: stats.reviewedProfiles || defaultStats.reviewedProfiles,
      description: 'Completed reviews'
    }
  };

  return (
    <Row className="g-4 mb-4">
      {Object.values(statsData).map((stat, index) => (
        <Col key={index} xs={12} md={6} lg={3}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center p-3">
              <div className="d-flex align-items-center me-3">
                {stat.icon}
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-1 text-uppercase text-muted small">
                  {stat.label}
                </h6>
                <h3 className="mb-0">{stat.value}</h3>
                <small className="text-muted">{stat.description}</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardStats;
