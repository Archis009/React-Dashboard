import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import '../../styles/layout.css';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="search-bar" style={{ visibility: 'hidden' }}>
        {/* Search bar removed as per request, keeping div for layout spacing if needed or just remove content */}
      </div>
      <div className="topbar-actions">
        {/* Notification and User Profile removed as per request */}
      </div>
    </header>
  );
};

export default Topbar;
