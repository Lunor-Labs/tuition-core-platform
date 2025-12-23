import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      path: '/teacher/dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'create-lesson',
      path: '/teacher/create-lesson',
      label: 'Create Lesson',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 'lessons',
      path: '/teacher/lessons',
      label: 'Lessons',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'tests',
      path: '/teacher/tests',
      label: 'Tests',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.33 0 2.6.29 3.74.82" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'settings',
      path: '/teacher/settings',
      label: 'Settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L5 12V20C5 28.5 11.5 35.5 20 37C28.5 35.5 35 28.5 35 20V12L20 5Z" fill="currentColor"/>
              <path d="M20 10L10 15V20C10 26 14.5 31 20 32C25.5 31 30 26 30 20V15L20 10Z" fill="#1e293b"/>
            </svg>
          </div>
          {!isCollapsed && (
            <span className="logo-text">AMILA</span>
          )}
        </div>
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  title={isCollapsed ? item.label : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="nav-label">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!isCollapsed && (
            <div className="user-details">
              <span className="user-name">Amila Edirimanna</span>
              <span className="user-role">Physics</span>
            </div>
          )}
        </div>

        <button className="logout-btn" onClick={() => {
          // Handle logout logic here
          if (window.confirm('Are you sure you want to logout?')) {
            // In a real app, this would clear tokens, redirect to login, etc.
            console.log('Logging out...');
            // For now, just redirect to home/login
            window.location.href = '/';
          }
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
