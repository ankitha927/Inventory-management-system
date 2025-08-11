import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate hook

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // ✅ for navigation

  // Load users on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/auth/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Failed to load users', err));
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      {/* <h2>Inventory Management System</h2> */}
      <h3>Admin Dashboard</h3>
      <p>Select a user to manage their products:</p>

      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id || user.email}>
              <button
                style={{
                  margin: '5px',
                  padding: '5px 10px',
                  width:'400px',
                  background: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/admin/user/${user.email}`, { state: { name: user.name } })}


              >
                {user.name} ({user.email})
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;