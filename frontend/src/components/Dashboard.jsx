import React, { useEffect, useState } from 'react';
import { fetchDashboard } from '../services/api';
import './Dashboard.css'; 

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalProducts: 0, totalQuantity: 0 });

  useEffect(() => {
    fetchDashboard().then((res) => setSummary(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Dashboard</h3>
      <div className="dashboard-stats">
        <p><strong>Total Products:</strong> {summary.totalProducts}</p>
        <p><strong>Total Quantity:</strong> {summary.totalQuantity}</p>
      </div>
    </div>
  );
};

export default Dashboard;
