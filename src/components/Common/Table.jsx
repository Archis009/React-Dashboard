import React from 'react';
import '../../styles/table.css';

const Table = ({ columns, data, onRowClick }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ width: col.width }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => onRowClick && onRowClick(row)}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-data">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
