import React, { useState } from 'react';
import { Form, Button, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Search, ArrowClockwise, InfoCircle, Sliders } from 'react-bootstrap-icons';

const SearchSection = ({ onSearch, loading = false }) => {
  const [searchParams, setSearchParams] = useState({
    department: '',
    course: '',
    experience: '',
    degree: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      department: '',
      course: '',
      experience: '',
      degree: '',
    });
    onSearch({});
  };

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biotechnology',
  ];

  const courses = ['B.Tech', 'M.Tech', 'M.Sc', 'Ph.D', 'Post Doc'];
  const experienceRanges = ['0-2', '2-5', '5-10', '10+'];
  const degrees = ['B.Tech', 'M.Tech', 'M.E.', 'M.Sc', 'Ph.D'];

  return (
    <div className="search-section card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Search Faculty</h5>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="search-tooltip">
                Search faculty members based on various criteria
              </Tooltip>
            }
          >
            <Button variant="link" className="p-0 text-muted">
              <InfoCircle size={18} />
            </Button>
          </OverlayTrigger>
        </div>
        
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={3}>
              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  name="department"
                  value={searchParams.department}
                  onChange={handleInputChange}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={2}>
              <Form.Group controlId="course">
                <Form.Label>Course</Form.Label>
                <Form.Select
                  name="course"
                  value={searchParams.course}
                  onChange={handleInputChange}
                >
                  <option value="">All Courses</option>
                  {courses.map(course => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={2}>
              <Form.Group controlId="experience">
                <Form.Label>Experience</Form.Label>
                <Form.Select
                  name="experience"
                  value={searchParams.experience}
                  onChange={handleInputChange}
                >
                  <option value="">Any Experience</option>
                  {experienceRanges.map(exp => (
                    <option key={exp} value={exp}>
                      {exp} {exp !== '10+' ? 'Years' : 'Years+'}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={2}>
              <Form.Group controlId="degree">
                <Form.Label>Highest Degree</Form.Label>
                <Form.Select
                  name="degree"
                  value={searchParams.degree}
                  onChange={handleInputChange}
                >
                  <option value="">Any Degree</option>
                  {degrees.map(degree => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={3} className="d-flex align-items-end">
              <div className="d-flex gap-2 w-100">
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="flex-grow-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Searching...
                    </>
                  ) : (
                    <><Search className="me-1" /> Search</>
                  )}
                </Button>
                
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="reset-tooltip">Reset Filters</Tooltip>}
                >
                  <Button 
                    variant="outline-secondary" 
                    onClick={handleReset}
                    disabled={loading}
                  >
                    <ArrowClockwise />
                  </Button>
                </OverlayTrigger>
                
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="advanced-tooltip">Advanced Search</Tooltip>}
                >
                  <Button variant="outline-info">
                    <Sliders />
                  </Button>
                </OverlayTrigger>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SearchSection;
