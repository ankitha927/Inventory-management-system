import React, { useState } from 'react';
import './ProductForm.css'; 

const ProductForm = ({ initialData, onSubmit, onCancel }) => {
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    price: 0.0,
    description: '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input name="name" value={product.name} onChange={handleChange} required placeholder="Name" />
      <input name="sku" value={product.sku} onChange={handleChange} required placeholder="SKU" />
      <input name="category" value={product.category} onChange={handleChange} placeholder="Category" />
      <input name="quantity" type="number" value={product.quantity} onChange={handleChange} required placeholder="Quantity" />
      <input name="price" type="number" step="0.01" value={product.price} onChange={handleChange} required placeholder="Price" />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" />
      <div className="form-buttons">
        <button type="submit" className="save-btn">Save</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ProductForm;
