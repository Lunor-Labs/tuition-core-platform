import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    { id: 1, label: 'Create Lesson', icon: '✏️' },
    { id: 2, label: 'Schedule Test', icon: '📝' },
    { id: 3, label: 'Send Message', icon: '💬' },
  ];

  return (
    <header className="teacher-header">
      <div className="header-content">
        {/* Left Section */}
        <div className="header-left">
          <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Search Bar */}
          <div className={`search-container ${searchActive ? 'active' : ''}`}>
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search students, lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchActive(true)}
              onBlur={() => !searchQuery && setSearchActive(false)}
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="header-right">
          {/* Quick Actions */}
          <div className="quick-actions">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="action-button"
                title={action.label}
                aria-label={action.label}
              >
                <span className="action-icon">{action.icon}</span>
              </button>
            ))}
          </div>

          {/* Notifications */}
          <button className="notification-button" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="notification-badge">3</span>
          </button>

          {/* User Profile */}
          <div className="user-profile">
            <div className="avatar">TJ</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
