import React, { useState } from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import SearchComponent from './components/SearchComponent';

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (formData) => {
    setSubmittedData(formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="app-container">
      <div className="left-section">
        <FormComponent onSubmit={handleFormSubmit} />
      </div>
      <div className="right-section">
        <SearchComponent />
        {submittedData && (
          <div className="form-data-preview">
            <h3>Submitted Form Data:</h3>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;