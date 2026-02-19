import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Package, LogOut } from 'lucide-react';
import '../../styles/layout.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>DashBoard</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
              <ShoppingCart size={20} />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Users size={20} />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Package size={20} />
              <span>Products</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        {/* Logout button removed as per request */}
      </div>
    </div>
  );
};

export default Sidebar;
