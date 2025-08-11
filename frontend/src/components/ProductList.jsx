import React, { useEffect, useState } from 'react';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api';
import ProductForm from './ProductForm';
import './ProductList.css'; 

const ProductList = ({ overrideEmail }) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ search: '', category: '' });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const effectiveEmail = overrideEmail || localStorage.getItem('email');

  const loadProducts = () => {
    fetchProducts(filter.search, filter.category, effectiveEmail).then((res) => {
      setProducts(res.data);
      setCurrentPage(1);
    });
  };

  useEffect(() => {
    loadProducts();
  }, [filter, effectiveEmail]);

  const handleSave = async (product) => {
    try {
      if (editing) {
        await updateProduct(editing.id, product);
      } else {
        await createProduct(product, effectiveEmail);
      }
      setShowForm(false);
      setEditing(null);
      loadProducts();
    } catch (e) {
      alert('Error: ' + (e.response?.data?.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="product-list-container">
      {overrideEmail ? (
        <h3>
          Managing Products for: <span>{overrideEmail}</span>
        </h3>
      ) : (
        <h3>Your Products</h3>
      )}

      <div className="filter-bar">
        <input
          placeholder="Search by name..."
          value={filter.search}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, search: e.target.value }))
          }
        />
        <input
          placeholder="Filter by category..."
          value={filter.category}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, category: e.target.value }))
          }
        />
        <button
          onClick={() => {
            setFilter({ search: '', category: '' });
            setEditing(null);
            setShowForm(false);
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          initialData={editing}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Description</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.sku}</td>
              <td>{prod.category}</td>
              <td>{prod.quantity}</td>
              <td>{prod.price}</td>
              <td>{prod.description}</td>
              <td>
                <button
                  onClick={() => {
                    setEditing(prod);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
