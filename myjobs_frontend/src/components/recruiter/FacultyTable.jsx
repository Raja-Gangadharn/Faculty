import React, { useState, useMemo } from 'react';
import { 
  Table, 
  Badge, 
  Button, 
  Dropdown, 
  Pagination, 
  OverlayTrigger,
  Tooltip,
  Form
} from 'react-bootstrap';
import { SortUp, SortDown, ThreeDots } from 'react-bootstrap-icons';

// Sample data - will be replaced with API data
const sampleData = [
  {
    id: 1,
    name: 'Dr. John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    department: 'Computer Science',
    experience: 8,
    experienceRange: '5-10',
    courses: ['Data Structures', 'Algorithms', 'Machine Learning'],
    degrees: ['Ph.D', 'M.Tech'],
    degreeCredits: 120,
    departments: ['Computer Science', 'Electrical Engineering'],
    status: 'Available',
    isBookmarked: false,
    lastActive: '2 days ago',
    rating: 4.8,
    studentsGuided: 24
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    department: 'Electrical Engineering',
    experience: 12,
    experienceRange: '10+',
    courses: ['Circuit Theory', 'Power Systems'],
    degrees: ['Ph.D', 'M.E.'],
    degreeCredits: 150,
    departments: ['Electrical Engineering', 'Computer Science'],
    status: 'Available',
    isBookmarked: true,
    lastActive: '1 week ago',
    rating: 4.9,
    studentsGuided: 32
  }
];

const FacultyTable = ({ 
  data = sampleData, 
  loading = false, 
  onSelect = () => {},
  onBookmark = () => {},
  onContact = () => {}
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    
    // Apply sorting
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableItems;
  }, [data, sortConfig]);

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle select all
  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentItems.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Toggle single row selection
  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'success';
      case 'not available':
        return 'danger';
      case 'on leave':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  // Render sort icon
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <span className="ms-1 text-muted"><SortDown /></span>;
    }
    return sortConfig.direction === 'asc' 
      ? <SortUp className="text-primary" /> 
      : <SortDown className="text-primary" />;
  };

  // Action dropdown menu
  const renderActionMenu = (faculty) => (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" size="sm" className="p-1">
        <i className="bi bi-three-dots-vertical" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href={`mailto:${faculty.email}`}>
          <i className="bi bi-envelope me-2" /> Send Email
        </Dropdown.Item>
        <Dropdown.Item href={`tel:${faculty.phone}`}>
          <i className="bi bi-phone me-2" /> Call
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <i className="bi bi-file-pdf me-2" /> Download CV (PDF)
        </Dropdown.Item>
        <Dropdown.Item>
          <i className="bi bi-file-word me-2" /> Download CV (Word)
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <i className="bi bi-bookmark me-2" /> Add to Shortlist
        </Dropdown.Item>
        <Dropdown.Item className="text-danger">
          <i className="bi bi-trash me-2"></i> Remove
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  // Pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      // Less than maxVisiblePages pages, show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than maxVisiblePages pages, calculate start and end pages
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
      
      if (currentPage <= maxPagesBeforeCurrent) {
        // Near the start
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        // Near the end
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        // In the middle
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    // First page
    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} active={1 === currentPage} onClick={() => paginate(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item 
          key={i} 
          active={i === currentPage} 
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }
      items.push(
        <Pagination.Item 
          key={totalPages} 
          active={totalPages === currentPage} 
          onClick={() => paginate(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <div className="faculty-table card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">
            Search Results
            {selectedRows.length > 0 && (
              <span className="ms-2 text-muted" style={{ fontSize: '0.9rem' }}>
                ({selectedRows.length} selected)
              </span>
            )}
          </h5>
          <div className="d-flex gap-2">
            <OverlayTrigger placement="top" overlay={<Tooltip>Export to PDF</Tooltip>}>
              <Button variant="outline-secondary" size="sm">
                <i className="bi bi-file-pdf me-1" /> Export
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>Contact Selected</Tooltip>}>
              <Button 
                variant="outline-primary" 
                size="sm"
                disabled={selectedRows.length === 0}
              >
                <i className="bi bi-envelope me-2" /> Contact
              </Button>
            </OverlayTrigger>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 mb-0">Loading faculty data...</p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead>
                  <tr>
                    <th width="40">
                      <Form.Check 
                        type="checkbox" 
                        checked={currentItems.length > 0 && 
                          currentItems.every(item => selectedRows.includes(item.id))}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th 
                      className="cursor-pointer" 
                      onClick={() => handleSort('name')}
                    >
                      <div className="d-flex align-items-center">
                        Faculty Name
                        <div className="d-flex align-items-center ms-1">
                          {sortConfig.key !== 'name' ? (
                            <span className="text-muted"><i className="bi bi-sort-down" /></span>
                          ) : sortConfig.direction === 'asc' ? (
                            <i className="bi bi-sort-up text-primary" />
                          ) : (
                            <i className="bi bi-sort-down text-primary" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th 
                      className="cursor-pointer" 
                      onClick={() => handleSort('department')}
                    >
                      <div className="d-flex align-items-center">
                        Department
                        <div className="d-flex align-items-center ms-1">
                          {sortConfig.key !== 'department' ? (
                            <span className="text-muted"><i className="bi bi-sort-down" /></span>
                          ) : sortConfig.direction === 'asc' ? (
                            <i className="bi bi-sort-up text-primary" />
                          ) : (
                            <i className="bi bi-sort-down text-primary" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th 
                      className="cursor-pointer" 
                      onClick={() => handleSort('experience')}
                    >
                      <div className="d-flex align-items-center">
                        Experience
                        <div className="d-flex align-items-center ms-1">
                          {sortConfig.key !== 'experience' ? (
                            <span className="text-muted"><i className="bi bi-sort-down" /></span>
                          ) : sortConfig.direction === 'asc' ? (
                            <i className="bi bi-sort-up text-primary" />
                          ) : (
                            <i className="bi bi-sort-down text-primary" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th>Courses</th>
                    <th>Degrees</th>
                    <th>Degree Credits</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((faculty) => (
                      <tr 
                        key={faculty.id} 
                        className={selectedRows.includes(faculty.id) ? 'table-active' : ''}
                        onClick={() => onSelect && onSelect(faculty)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td onClick={(e) => e.stopPropagation()}>
                          <Form.Check 
                            type="checkbox" 
                            checked={selectedRows.includes(faculty.id)}
                            onChange={() => toggleRowSelection(faculty.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div 
                              className="avatar-sm bg-light rounded-circle d-flex align-items-center justify-content-center me-2"
                              style={{ width: '36px', height: '36px' }}
                            >
                              <span className="text-primary fw-medium">
                                {faculty.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h6 className="mb-0">
                                {faculty.name}
                                {faculty.isBookmarked && (
                                  <i className="bi bi-bookmark-fill ms-1 text-warning" style={{ fontSize: '0.75rem' }} />
                                )}
                              </h6>
                              <small className="text-muted">{faculty.email}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-nowrap">{faculty.department}</div>
                          <small className="text-muted">{faculty.lastActive}</small>
                        </td>
                        <td>
                          {faculty.experience} yrs
                          <small className="text-muted">({faculty.experienceRange})</small>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-1" style={{ maxWidth: '200px' }}>
                            {faculty.courses.map((course, i) => (
                              <Badge key={i} bg="light" text="dark" className="fw-normal">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            {faculty.degrees.map((degree, i) => (
                              <div key={i} className="d-flex align-items-center">
                                <Badge bg="info" className="me-2">
                                  {degree}
                                </Badge>
                                <small className="text-muted">{i === 0 ? 'Primary' : 'Secondary'}</small>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>{faculty.degreeCredits}</td>
                        <td>
                          <div className="d-flex gap-2 align-items-center">
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                onContact && onContact(faculty);
                              }}
                            >
                              <i className="bi bi-envelope me-1" /> Contact
                            </Button>
                            <Button 
                              variant="outline-success" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookmark && onBookmark(faculty);
                              }}
                            >
                              <div className="d-flex align-items-center">
                                {faculty.isBookmarked ? (
                                  <i className="bi bi-bookmark-fill me-1" />
                                ) : (
                                  <i className="bi bi-bookmark me-1" />
                                )}
                                {faculty.isBookmarked ? 'Unsave' : 'Save'}
                              </div>
                            </Button>
                            {renderActionMenu(faculty)}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <div className="text-muted">
                          No faculty members found. Try adjusting your search criteria.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {currentItems.length > 0 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries
                </div>
                <Pagination size="sm">
                  <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                  <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                  {renderPaginationItems()}
                  <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                  <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FacultyTable;
