import React, { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mockData';
import Table from '../components/Common/Table';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import '../styles/dashboard.css';
import '../styles/table.css';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { orders } = MOCK_DATA;

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Columns Configuration
  const columns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Amount', 
      accessor: 'amount',
      render: (row) => `$${row.amount}` 
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`status-badge ${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      )
    },
    { header: 'Region', accessor: 'region' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Orders</h1>
          <p>Manage and view all customer orders</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="filter-panel" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
          <div className="search-bar" style={{ width: '300px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <Filter size={16} />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <Table columns={columns} data={paginatedOrders} />

      {/* Pagination */}
      <div className="pagination">
        <span className="pagination-info">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
        </span>
        <div className="pagination-controls">
          <button 
            className="pagination-btn" 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft size={16} />
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
              key={page} 
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button 
            className="pagination-btn" 
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
             Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
