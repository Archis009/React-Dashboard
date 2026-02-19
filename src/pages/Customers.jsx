import React, { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mockData';
import Table from '../components/Common/Table';
import { Search, ChevronLeft, ChevronRight, User } from 'lucide-react';
import '../styles/dashboard.css';
import '../styles/table.css';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { customers } = MOCK_DATA;

  // Filter Logic
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      return (
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [customers, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Columns Configuration
  const columns = [
    { 
      header: 'Customer', 
      accessor: 'name',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            backgroundColor: '#eff6ff', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3b82f6'
          }}>
            <User size={16} />
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>{row.name}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{row.email}</div>
          </div>
        </div>
      )
    },
    { header: 'ID', accessor: 'id' },
    { 
      header: 'Total Orders', 
      accessor: 'totalOrders',
      render: (row) => (
        <div style={{ textAlign: 'center', width: '80px' }}>
          {row.totalOrders}
        </div>
      ) 
    },
    { 
      header: 'Total Spend', 
      accessor: 'totalSpend',
      render: (row) => (
        <div style={{ fontWeight: 600, color: '#0f172a' }}>
          ${row.totalSpend}
        </div>
      )
    },
    { 
      header: 'Avg. Order Value', 
      accessor: 'avgOrder',
      render: (row) => (
        <div>
          ${(row.totalSpend / row.totalOrders).toFixed(2)}
        </div>
      )
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Customers</h1>
          <p>View customer details and order history</p>
        </div>
      </div>

       {/* Toolbar */}
       <div className="filter-panel" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
          <div className="search-bar" style={{ width: '300px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <Table columns={columns} data={paginatedCustomers} />

      {/* Pagination */}
      <div className="pagination">
        <span className="pagination-info">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries
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

export default Customers;
