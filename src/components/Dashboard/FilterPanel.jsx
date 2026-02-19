import React from 'react';
import { Filter } from 'lucide-react';
import '../../styles/dashboard.css';

const FilterPanel = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-panel">
      <div className="filter-title">
        <Filter size={16} />
        <span>Filters</span>
      </div>
      
      <div className="filter-group">
        <label>Date Range</label>
        <select 
          value={filters.dateRange} 
          onChange={(e) => onFilterChange('dateRange', e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="1m">Last 30 Days</option>
          <option value="3m">Last 3 Months</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Region</label>
        <select 
          value={filters.region} 
          onChange={(e) => onFilterChange('region', e.target.value)}
        >
          <option value="All">All Regions</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Category</label>
        <select 
          value={filters.category} 
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home">Home</option>
          <option value="Beauty">Beauty</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
