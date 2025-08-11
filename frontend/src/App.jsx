import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import AdminUserDashboard from './components/AdminUserDashboard';
import UserDashboard from './components/UserDashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './styles.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('email', userData.email);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('email');
  };

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login setUser={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        
        {user && (
          <>
            <Route
              path="/dashboard"
              element={
                <div>
                  <h2 style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '2.5rem',
                    textShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff'
                  }}>
                    Inventory Management System
                  </h2>
                  <button
                    onClick={handleLogout}
                    style={{ position: 'absolute', right: 20, top: 20 }}
                  >
                    Logout
                  </button>
                  {user.isAdmin ? <AdminDashboard /> : <UserDashboard user={user} />}
                </div>
              }
            />
            {user.isAdmin && (
              <Route path="/admin/user/:email" element={<AdminUserDashboard />} />
            )}
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
          </>
        )}

        
        {!user && (
          <>
            <Route path="/dashboard" element={<Navigate to="/login" />} />
            <Route path="/products/*" element={<Navigate to="/login" />} />
            <Route path="/admin/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
