import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductList from './ProductList';

const AdminUserDashboard = () => {
  const { email } = useParams();
  const location = useLocation();
  const userName = location.state?.name || "Unknown User";

  return (
    <div style={{ margin: '20px' }}>
     
      <ProductList overrideEmail={email} />
    </div>
  );
};

export default AdminUserDashboard;