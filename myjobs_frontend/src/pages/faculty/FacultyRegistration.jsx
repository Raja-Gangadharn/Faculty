import { useState } from 'react';
import { registerFaculty } from '../../services/authService';
import { Link, useNavigate } from "react-router-dom";
import './faculty.css';

const FacultyRegistration = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    workPreference: '',
    resume: null,
    transcripts: null,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format.';
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!formData.workPreference) newErrors.workPreference = 'Select a work preference.';
    if (!formData.resume) newErrors.resume = 'Resume is required.';
    if (!formData.transcripts) newErrors.transcripts = 'Transcripts are required.';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerFaculty(formData);
      setSuccessMessage('Registration successful! Redirecting to login...');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        workPreference: '',
        resume: null,
        transcripts: null,
        agreeTerms: false,
      });
      setErrors({});
      setTimeout(() => {
        navigate('/faculty/login');
      }, 2000);
    } catch (err) {
      alert(err.detail || 'Registration failed.');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-light faculty-page">

      <div className="row g-0 my-5 card-shadow ">
        {/* Left Panel */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-4 rounded-start">
          <h4 className="text-center mb-3">Welcome to Faculty Finder</h4>
          <p className="text-center">
            We connect universities with a professional network of qualified faculty — quickly, efficiently, and affordably.
          </p>
        </div>

        {/* Right Panel */}
        <div className="col-md-6 col-12 bg-white p-4 rounded-end">
          <h4 className="mb-3 text-center text-md-start">Faculty Registration</h4>

          {successMessage && (
            <div className="alert alert-success text-center" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* First Name */}
            <div className="mb-3">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Work Preference */}
            <div className="mb-3">
              <label className="form-label">Work Preference *</label>
              <select
                name="workPreference"
                value={formData.workPreference}
                onChange={handleChange}
                className={`form-select ${errors.workPreference ? 'is-invalid' : ''}`}
              >
                <option value="">Select preference</option>
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </select>
              {errors.workPreference && <div className="invalid-feedback">{errors.workPreference}</div>}
            </div>

            {/* Resume */}
            <div className="mb-3">
              <label className="form-label">Upload Resume *</label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
              />
              {errors.resume && <div className="invalid-feedback">{errors.resume}</div>}
            </div>

            {/* Transcripts */}
            <div className="mb-3">
              <label className="form-label">Upload Transcripts *</label>
              <input
                type="file"
                name="transcripts"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className={`form-control ${errors.transcripts ? 'is-invalid' : ''}`}
              />
              {errors.transcripts && <div className="invalid-feedback">{errors.transcripts}</div>}
            </div>

            {/* Terms */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
                id="agreeTerms"
              />
              <label className="form-check-label" htmlFor="agreeTerms">
                I agree to the <a href="#">terms and conditions</a>
              </label>
              {errors.agreeTerms && <div className="invalid-feedback d-block">{errors.agreeTerms}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Sign up</button>

            <p className="text-center mt-3">
              Already have an account? <Link to="/faculty/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
};

export default FacultyRegistration;