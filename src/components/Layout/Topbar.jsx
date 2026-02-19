import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Package } from 'lucide-react';
import '../../styles/layout.css';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="topbar-logo">
        <h2>DashBoard</h2>
      </div>
      
      <nav className="topbar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
              <ShoppingCart size={18} />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Users size={18} />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Package size={18} />
              <span>Products</span>
            </NavLink>
          </li>
        </ul>
      </nav>


    </header>
  );
};

export default Topbar;
