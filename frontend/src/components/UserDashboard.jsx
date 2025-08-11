import React from 'react';
import Dashboard from './Dashboard';
import ProductList from './ProductList';

const UserDashboard = ({ user }) => {
  return (
    <div>
      <Dashboard />
      <ProductList />
    </div>
  );
};

export default UserDashboard;
