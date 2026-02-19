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
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <span>Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
