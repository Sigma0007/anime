import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/mockData';
import './PaginatedList.css';

const PaginatedList = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setItems(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="paginated-list">
      <h2>Paginated List</h2>
      
      <div className="items-container">
        {currentItems.map((item) => (
          <div key={item.id} className="list-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span className="page-info">
          Page {currentPage} of {Math.ceil(items.length / itemsPerPage)}
        </span>
        
        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
        >
          Next
        </button>
        
        <div className="items-per-page-info">
          Showing {itemsPerPage} items per page
        </div>
      </div>
    </div>
  );
};

export default PaginatedList;