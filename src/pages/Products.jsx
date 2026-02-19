import React, { useState, useMemo } from 'react';
import { MOCK_DATA } from '../data/mockData';
import Table from '../components/Common/Table';
import { Search, Filter, Package } from 'lucide-react';
import '../styles/dashboard.css';
import '../styles/table.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const { products } = MOCK_DATA;

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  // Aggregate Stats (Top selling product)
  const topProduct = useMemo(() => {
      if (filteredProducts.length === 0) return null;
      return filteredProducts.reduce((prev, current) => (prev.unitsSold > current.unitsSold) ? prev : current);
  }, [filteredProducts]);


  // Columns Configuration
  const columns = [
    { 
      header: 'Product Name', 
      accessor: 'name',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            backgroundColor: '#f3e8ff', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a855f7'
          }}>
            <Package size={16} />
          </div>
          <span style={{ fontWeight: 500 }}>{row.name}</span>
        </div>
      )
    },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Price', 
      accessor: 'price',
      render: (row) => `$${row.price}` 
    },
    { header: 'Units Sold', accessor: 'unitsSold' },
    { 
      header: 'Total Revenue', 
      accessor: 'revenue',
      render: (row) => (
          <span style={{ fontWeight: 600, color: '#16a34a' }}>
              ${Number(row.revenue).toLocaleString()}
          </span>
      )
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Products</h1>
          <p>Analyze product performance and inventory</p>
        </div>
        
        {topProduct && (
            <div style={{ 
                backgroundColor: '#f0f9ff', 
                padding: '8px 16px', 
                borderRadius: '8px', 
                border: '1px solid #bae6fd',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                color: '#0369a1'
            }}>
                <span style={{ fontWeight: 600 }}>Top Performer:</span> {topProduct.name} ({topProduct.unitsSold} units)
            </div>
        )}
      </div>

       {/* Toolbar */}
       <div className="filter-panel" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
          <div className="search-bar" style={{ width: '300px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <Filter size={16} />
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {Array.from(new Set(products.map(p => p.category))).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <Table columns={columns} data={filteredProducts} />
    </div>
  );
};

export default Products;
