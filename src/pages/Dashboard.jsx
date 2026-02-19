import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import FilterPanel from '../components/Dashboard/FilterPanel';
import KPICard from '../components/Dashboard/KPICard';
import RevenueChart from '../components/Dashboard/Charts/RevenueChart';
import OrdersBarChart from '../components/Dashboard/Charts/OrdersBarChart';
import SalesPieChart from '../components/Dashboard/Charts/SalesPieChart';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { filters, updateFilter, kpiData, charts } = useDashboardData();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard Overview</h1>
          <p>Welcome back, here's what's happening correctly.</p>
        </div>
        <FilterPanel filters={filters} onFilterChange={updateFilter} />
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard 
          title="Total Revenue" 
          value={`$${kpiData.revenue.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          trend="up"
          trendValue="12.5"
          color="blue"
        />
        <KPICard 
          title="Total Orders" 
          value={kpiData.orders}
          icon={<ShoppingBag size={24} />}
          trend="up"
          trendValue="8.2"
          color="purple"
        />
        <KPICard 
          title="Total Customers" 
          value={kpiData.customers}
          icon={<Users size={24} />}
          trend="down"
          trendValue="1.8"
          color="orange"
        />
        <KPICard 
          title="Conversion Rate" 
          value={`${kpiData.conversionRate}%`}
          icon={<TrendingUp size={24} />}
          trend="up"
          trendValue="4.3"
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <RevenueChart data={charts.revenue} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
             <OrdersBarChart data={charts.ordersByCategory} /> 
             <SalesPieChart data={charts.salesByRegion} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
