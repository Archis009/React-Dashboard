import { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mockData';

export const useDashboardData = () => {
  const [filters, setFilters] = useState({
    dateRange: 'all', // '1m', '3m', '6m', '1y', 'all'
    region: 'All',
    category: 'All',
  });

  const { orders } = MOCK_DATA;

  const filteredOrders = useMemo(() => {
    const now = new Date('2023-12-31'); 
    
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      
      if (filters.dateRange !== 'all') {
        const cutoffDate = new Date(now);
        switch (filters.dateRange) {
          case '1m': cutoffDate.setMonth(now.getMonth() - 1); break;
          case '3m': cutoffDate.setMonth(now.getMonth() - 3); break;
          case '6m': cutoffDate.setMonth(now.getMonth() - 6); break;
          case '1y': cutoffDate.setFullYear(now.getFullYear() - 1); break;
          default: break;
        }
        if (orderDate < cutoffDate) return false;
      }

      if (filters.region !== 'All' && order.region !== filters.region) return false;
      
      if (filters.category !== 'All' && order.category !== filters.category) return false;
      
      return true;
    });
  }, [filters, orders]);

  const kpiData = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((acc, order) => acc + parseFloat(order.amount), 0);
    const totalOrders = filteredOrders.length;
    const totalCustomers = new Set(filteredOrders.map(o => o.customer)).size;
    const conversionRate = 2.4;

    return {
      revenue: totalRevenue.toFixed(2),
      orders: totalOrders,
      customers: totalCustomers,
      conversionRate,
    };
  }, [filteredOrders]);

  const charts = useMemo(() => {
    const revenueMap = {};
    filteredOrders.forEach(order => {
      const month = new Date(order.date).toLocaleString('default', { month: 'short' });
      revenueMap[month] = (revenueMap[month] || 0) + parseFloat(order.amount);
    });
    
    const revenueData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      .map(month => ({
        name: month,
        revenue: revenueMap[month] || 0
      }));

    const categoryMap = {};
    filteredOrders.forEach(order => {
      const cat = order.category || 'Other';
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    
    const ordersByCategory = Object.keys(categoryMap).map(cat => ({
      name: cat,
      orders: categoryMap[cat]
    }));

    const regionMap = {};
    filteredOrders.forEach(order => {
      const reg = order.region || 'Other';
      regionMap[reg] = (regionMap[reg] || 0) + 1;
    });
    
    const salesByRegion = Object.keys(regionMap).map(reg => ({
      name: reg,
      value: regionMap[reg]
    }));

    return { revenueData, ordersByCategory, salesByRegion };
  }, [filteredOrders]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    updateFilter,
    kpiData,
    charts: {
      revenue: charts.revenueData,
      ordersByCategory: charts.ordersByCategory,
      salesByRegion: charts.salesByRegion,
    },
    recentOrders: filteredOrders.slice(0, 5)
  };
};
