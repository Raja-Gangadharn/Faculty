import { Link } from 'react-router-dom';
import './LandingPage.css'; // Add custom styles for animations

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Modern Navbar */}
      <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4 text-primary">JobPortal</span>
          <div className="d-flex align-items-center">
            <Link to="#" className="nav-link mx-3 hover-effect">News & Resources</Link>
            <Link to="" className="nav-link mx-3 hover-effect">My Account</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">Welcome to JobPortal</h1>
          <p className="hero-subtitle animate-fade-in-delay">Your Gateway to Academic Opportunities</p>
          <div className="portal-buttons animate-fade-in-delay-2">
            <Link to="/faculty/login" className="portal-btn faculty-hover btn btn-primary px-5 py-3 fs-5">
              I'm Faculty
            </Link>
            <Link to="/recruiter/login" className="portal-btn recruiter-hover btn btn-success px-5 py-3 fs-5">
              I'm Recruiter
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🎓</div>
                <h3>For Faculty</h3>
                <p>Access academic opportunities and connect with institutions worldwide</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🏢</div>
                <h3>For Recruiters</h3>
                <p>Find qualified academic professionals for your institution</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Smart Matching</h3>
                <p>Advanced algorithms to match the right candidates with the right opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
