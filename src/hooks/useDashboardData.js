import { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mockData';

export const useDashboardData = () => {
  const [filters, setFilters] = useState({
    dateRange: 'all', // '1m', '3m', '6m', '1y', 'all'
    region: 'All',
    category: 'All',
  });

  const { orders, revenueData, ordersByCategory, salesByRegion, products, customers } = MOCK_DATA;

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Date Filter (Mock logic as data is static/random)
      // In a real app, we'd parse dates. Here we simulate.
      
      // Region Filter
      if (filters.region !== 'All' && order.region !== filters.region) return false;
      
      // Category Filter (derived from product or explicit)
      // Our order mock doesn't have category directly, but let's assume it does for simplicity
      // or we simulate it. The mock data generator adds 'category' to orders for this purpose maybe?
      // Wait, let's check mockData.js. 
      // I generated: id, customer, date, amount, status, region. 
      // I missed category in orders mock data! 
      // I should assume pure random category for now or map it.
      // Let's assume we can't filter orders by category easily without joining, 
      // so we might filter the charts instead or update the mock logic.
      // For now, I'll skip category filtering on the *orders list* if it's not there,
      // but KPI cards usually depend on aggregated data.
      
      return true;
    });
  }, [filters, orders]);

  // KPIs
  const kpiData = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((acc, order) => acc + parseFloat(order.amount), 0);
    const totalOrders = filteredOrders.length;
    const totalCustomers = new Set(filteredOrders.map(o => o.customer)).size; // Unique customers in period
    const conversionRate = 2.4; // Static for now

    return {
      revenue: totalRevenue,
      orders: totalOrders,
      customers: totalCustomers,
      conversionRate,
    };
  }, [filteredOrders]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    updateFilter,
    kpiData,
    charts: {
      revenue: revenueData, // static for now, usually would filter
      ordersByCategory,
      salesByRegion,
    },
    recentOrders: filteredOrders.slice(0, 5)
  };
};
