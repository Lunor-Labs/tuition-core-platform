import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="teacher-layout">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${sidebarCollapsed ? '' : 'active'}`}
        onClick={toggleSidebar}
      />
    </div>
  );
};

export default Layout;
