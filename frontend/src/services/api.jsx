import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Helper to get current user's email
const getEmail = () => localStorage.getItem("email");


// AUTH
export const login = (email, password) =>
  axios.post(`${BASE_URL}/auth/login`, { email, password });

export const register = (user) =>
  axios.post(`${BASE_URL}/auth/register`, user);

// DASHBOARD (send email)
export const fetchDashboard = () => {
  const email = localStorage.getItem("email");
  return axios.get(`${BASE_URL}/products/dashboard`, {
    params: { userEmail: email },
  });
};


// GET PRODUCTS

export const fetchProducts = (search, category, userEmail) => {
  const params = {};
  if (search) params.search = search;
  if (category) params.category = category;
  if (userEmail) params.userEmail = userEmail;

  return axios.get(`${BASE_URL}/products`, { params });
};



// CREATE PRODUCT


export const createProduct = (productData) => {
  const userEmail = getEmail(); //

  return axios.post(`${BASE_URL}/products`, productData, {
    headers: {
      "X-User-Email": userEmail
    }
  });
};




// UPDATE PRODUCT
export const updateProduct = (id, product) => {
  const userEmail = getEmail();
  return axios.put(`${BASE_URL}/products/${id}`, { ...product, userEmail }); 
};

// DELETE PRODUCT
export const deleteProduct = (id) => {
  const userEmail = getEmail();
  return axios.delete(`${BASE_URL}/products/${id}`, {
    params: { userEmail }, 
  });
};
