import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import '../../styles/dashboard.css';

const KPICard = ({ title, value, icon, trend, trendValue, color }) => {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <div className={`kpi-icon ${color}`}>
          {icon}
        </div>
        <span className="kpi-title">{title}</span>
      </div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-trend ${trend === 'up' ? 'up' : 'down'}`}>
        {trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span>{trendValue}% from last month</span>
      </div>
    </div>
  );
};

export default KPICard;
