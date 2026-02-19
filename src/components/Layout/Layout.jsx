import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import '../../styles/layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
