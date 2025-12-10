import React, { useState } from 'react';
import './FormComponent.css';

const FormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    gender: '',
    subjects: [],
    resume: null,
    url: '',
    position: '',
    choice: '',
    about: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      const updatedSubjects = checked
        ? [...formData.subjects, value]
        : formData.subjects.filter(subject => subject !== value);
      
      setFormData({
        ...formData,
        subjects: updatedSubjects
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      gender: '',
      subjects: [],
      resume: null,
      url: '',
      position: '',
      choice: '',
      about: ''
    });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Form in React</h1>
      
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="form-group">
          <label className="form-label">
            <strong>First Name*</strong>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            className="form-input"
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label className="form-label">
            <strong>Last Name*</strong>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            className="form-input"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">
            <strong>Enter Email*</strong>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="form-input"
            required
          />
        </div>

        {/* Contact */}
        <div className="form-group">
          <label className="form-label">
            <strong>Contact*</strong>
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter Mobile number"
            className="form-input"
            required
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="form-label">
            <strong>Gender*</strong>
          </label>
          <div className="radio-group">
            {['Male', 'Female', 'Other'].map(gender => (
              <label key={gender} className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value={gender.toLowerCase()}
                  checked={formData.gender === gender.toLowerCase()}
                  onChange={handleChange}
                  required
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Best Subject */}
        <div className="form-group">
          <label className="form-label">
            <strong>Your best Subject</strong>
          </label>
          <div className="checkbox-group">
            {['English', 'Maths', 'Physics'].map(subject => (
              <label key={subject} className="checkbox-label">
                <input
                  type="checkbox"
                  name="subjects"
                  value={subject.toLowerCase()}
                  checked={formData.subjects.includes(subject.toLowerCase())}
                  onChange={handleChange}
                />
                {subject}
              </label>
            ))}
          </div>
        </div>

        {/* Upload Resume */}
        <div className="form-group">
          <label className="form-label">
            <strong>Upload Resume*</strong>
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            className="file-input"
            required
          />
        </div>

        {/* URL */}
        <div className="form-group">
          <label className="form-label">
            <strong>Enter URL*</strong>
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Enter url"
            className="form-input"
            required
          />
        </div>

        {/* Position */}
        <div className="form-group">
          <label className="form-label">
            <strong>Position/Role</strong>
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter your position/role"
            className="form-input"
          />
        </div>

        {/* Select Choice */}
        <div className="form-group">
          <label className="form-label">
            <strong>Select your choice</strong>
          </label>
          <select
            name="choice"
            value={formData.choice}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select your Ans</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        {/* About */}
        <div className="form-group">
          <label className="form-label">
            <strong>About</strong>
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="About yourself"
            className="form-textarea"
            rows="4"
          />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="button" onClick={handleReset} className="btn reset-btn">
            Reset
          </button>
          <button type="submit" className="btn submit-btn">
            📤 Submit & View Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;