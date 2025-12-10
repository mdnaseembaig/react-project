import React from 'react';
import './DetailPage.css';

const DetailPage = ({ formData, onBack }) => {
  if (!formData) {
    return (
      <div className="detail-page">
        <h2>No Data Available</h2>
        <button onClick={onBack} className="back-btn">
          Go Back
        </button>
      </div>
    );
  }

  const handleSave = () => {
    const existingData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    
    const newSubmission = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    };
    
    localStorage.setItem('formSubmissions', JSON.stringify([...existingData, newSubmission]));
    
    alert('Data saved successfully!');
    onBack();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="detail-page">
      <div className="detail-header">
        <h1 className="detail-title">Your Submitted Details</h1>
        <p className="submission-time">
          Submitted on: {new Date().toLocaleString()}
        </p>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="detail-grid">
            <DetailItem label="First Name" value={formData.firstName} />
            <DetailItem label="Last Name" value={formData.lastName} />
            <DetailItem label="Email" value={formData.email} />
            <DetailItem label="Contact" value={formData.contact} />
            <DetailItem label="Gender" value={formData.gender} />
            <DetailItem label="Position" value={formData.position || 'Not specified'} />
            <DetailItem label="Website URL" value={formData.url} />
          </div>
        </div>

        <div className="detail-section">
          <h2 className="section-title">Education & Preferences</h2>
          <div className="detail-grid">
            <DetailItem 
              label="Best Subjects" 
              value={formData.subjects.join(', ') || 'None selected'} 
            />
            <DetailItem label="Selected Choice" value={formData.choice || 'Not selected'} />
          </div>
        </div>

        <div className="detail-section">
          <h2 className="section-title">About Yourself</h2>
          <div className="about-content">
            <p>{formData.about || 'No description provided'}</p>
          </div>
        </div>

        <div className="detail-section">
          <h2 className="section-title">File Upload</h2>
          <div className="file-info">
            <p>
              <strong>Resume:</strong> {formData.resume ? formData.resume.name : 'No file uploaded'}
            </p>
          </div>
        </div>
      </div>

      <div className="detail-actions">
        <button onClick={onBack} className="action-btn back-btn">
          ← Back to Form
        </button>
        <button onClick={handleSave} className="action-btn save-btn">
          💾 Save Data
        </button>
        <button onClick={handlePrint} className="action-btn print-btn">
          🖨️ Print
        </button>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <span className="detail-label">{label}:</span>
    <span className="detail-value">{value}</span>
  </div>
);

export default DetailPage;