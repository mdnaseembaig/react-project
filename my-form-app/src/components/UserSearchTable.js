import React, { useState, useEffect } from 'react';
import './UserSearchTable.css';

const UserSearchTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const savedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    setUsers(savedData);
    setFilteredUsers(savedData);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.position?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== id);
      localStorage.setItem('formSubmissions', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      alert('User deleted successfully!');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL users?')) {
      localStorage.removeItem('formSubmissions');
      setUsers([]);
      setFilteredUsers([]);
      alert('All users deleted!');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="user-search-table">
      <div className="search-header">
        <h1 className="search-title">Search</h1>
        <div className="search-controls">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search by name, email, or position..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <button 
            onClick={loadUsers}
            className="refresh-btn"
            title="Refresh List"
          >
            🔄 Refresh
          </button>
          {users.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="clear-all-btn"
            >
              🗑️ Clear All
            </button>
          )}
        </div>
      </div>

      <div className="users-table-container">
        <div className="table-header">
          <div className="header-item">NAME</div>
          <div className="header-item">EMAIL</div>
          <div className="header-item">POSITION</div>
          <div className="header-item">USER CREATED AT</div>
          <div className="header-item action">ACTIONS</div>
        </div>

        <div className="table-body">
          {filteredUsers.length === 0 ? (
            <div className="no-users">
              <p>No users found. Submit your form details to see them here!</p>
              <p className="hint">💡 Fill and submit the form to add your details to this table.</p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} className="table-row">
                <div className="row-item name">
                  <strong>{user.firstName} {user.lastName}</strong>
                </div>
                <div className="row-item email">{user.email}</div>
                <div className="row-item position">
                  {user.position || 'No position'}
                </div>
                <div className="row-item created-at">
                  {formatDate(user.submittedAt)}
                </div>
                <div className="row-item actions">
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="delete-user-btn"
                    title="Delete User"
                  >
                    🗑️
                  </button>
                  <button 
                    onClick={() => alert(`Details:\n\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nContact: ${user.contact}\nGender: ${user.gender}\nPosition: ${user.position}\nSubjects: ${user.subjects?.join(', ')}\nSubmitted: ${user.submittedAt}`)}
                    className="view-details-btn"
                    title="View Details"
                  >
                    👁️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="table-footer">
        <div className="summary">
          <p>
            Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-label">Total Users:</span>
            <span className="stat-value">{users.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Filtered:</span>
            <span className="stat-value">{filteredUsers.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchTable;