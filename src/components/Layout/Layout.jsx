import React from 'react';
import Topbar from './Topbar';
import '../../styles/layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Topbar />
      <main className="page-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
