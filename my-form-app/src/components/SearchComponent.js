import React, { useState } from 'react';
import './SearchComponent.css';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'Thomas Shelby',
      email: 'thomas@peaky-blinders.com',
      position: 'Boss',
      createdAt: 'January 20, 1921'
    },
    {
      id: 2,
      name: 'Arthur Shelby',
      email: 'Arthur@peaky-blinders.com',
      position: 'Second boss',
      createdAt: 'March 20, 1917'
    },
    {
      id: 3,
      name: 'Polly Gray',
      email: 'polly@peaky-blinders.com',
      position: 'Company treasurer',
      createdAt: 'March 20, 1912'
    },
    {
      id: 4,
      name: 'John Shelby',
      email: 'john@peaky-blinders.com',
      position: 'Fixer',
      createdAt: 'December 20, 1924'
    },
    {
      id: 5,
      name: 'Grace Shelby',
      email: 'grace@peaky-blinders.com',
      position: 'Miscellaneous',
      createdAt: 'April 20, 1921'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container">
      <h1 className="search-title">Search</h1>
      
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search by name, email, or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="users-table">
        <div className="table-header">
          <div className="header-item">NAME</div>
          <div className="header-item">EMAIL</div>
          <div className="header-item">POSITION</div>
          <div className="header-item">USER CREATED AT</div>
        </div>

        <div className="table-body">
          {filteredUsers.map(user => (
            <div key={user.id} className="table-row">
              <div className="row-item name">
                <strong>{user.name}</strong>
              </div>
              <div className="row-item email">{user.email}</div>
              <div className="row-item position">{user.position}</div>
              <div className="row-item created-at">{user.createdAt}</div>
            </div>
          ))}
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-results">
          No users found matching your search.
        </div>
      )}
    </div>
  );
};

export default SearchComponent;