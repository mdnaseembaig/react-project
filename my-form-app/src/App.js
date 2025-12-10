import React, { useState } from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import UserSearchTable from './components/UserSearchTable';
import DetailPage from './components/DetailPage';

function App() {
  const [submittedData, setSubmittedData] = useState(null);
  const [currentPage, setCurrentPage] = useState('form');

  const handleFormSubmit = (formData) => {
    setSubmittedData(formData);
    
    const existingData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const newSubmission = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    };
    
    localStorage.setItem('formSubmissions', JSON.stringify([...existingData, newSubmission]));
    
    alert('Form submitted successfully! Your details are now in the search table.');
    setCurrentPage('detail');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'detail':
        return (
          <DetailPage 
            formData={submittedData} 
            onBack={() => setCurrentPage('form')}
          />
        );
      
      case 'form':
      default:
        return (
          <>
            <div className="left-section">
              <FormComponent onSubmit={handleFormSubmit} />
            </div>
            <div className="right-section">
              <UserSearchTable />
              <div className="view-actions">
                <button 
                  onClick={() => setCurrentPage('detail')}
                  className="action-btn view-details-btn"
                  disabled={!submittedData}
                >
                  👁️ View Last Submission
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="main-title">📋 Form Submission System</h1>
        <div className="navigation">
          <button 
            onClick={() => setCurrentPage('form')}
            className={`nav-btn ${currentPage === 'form' ? 'active' : ''}`}
          >
            📝 Submit Form
          </button>
          <button 
            onClick={() => {
              const savedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
              if (savedData.length > 0) {
                alert(`You have ${savedData.length} saved submissions. Check them in the table!`);
              } else {
                alert('No submissions yet. Please submit the form first.');
              }
            }}
            className="nav-btn"
          >
            📊 Data Status
          </button>
        </div>
      </div>
      
      <div className="page-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;