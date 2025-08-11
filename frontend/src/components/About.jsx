// src/components/About.jsx
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div style={styles.page}>
     
      <nav style={styles.navbar}>
        <div></div>
        <div>
          <Link to="/login" style={styles.navButton}>Login</Link>
          <Link to="/register" style={{ ...styles.navButton, marginLeft: "12px" }}>Register</Link>
        </div>
      </nav>

      
      <main style={styles.hero}>
        <h1 style={styles.title}>
          Welcome to the Inventory Management System
        </h1>
        
        <div style={{ marginTop: "30px" }}>
          <Link to="/login" style={styles.ctaButton}>Get Started</Link>
        </div>
      </main>
    </div>
  );
};

// Styles
const styles = {
  page: {
    background: "linear-gradient(145deg, #0d0d0d, #1a1a1a)",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    borderBottom: "1px solid #1f1f1f",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "sticky",
    top: 0
  },
  navButton: {
    padding: "8px 16px",
    backgroundColor: "#00bfff",
    color: "#121212",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "0.9rem",
    transition: "background 0.3s",
  },
  hero: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    textAlign: "center"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    maxWidth: "700px",
    textShadow: "0 0 8px #00bfff, 0 0 16px #00bfff"
  },
  subtitle: {
    fontSize: "1.2rem",
    marginTop: "15px",
    maxWidth: "500px",
    color: "#bbb"
  },
  ctaButton: {
    padding: "12px 24px",
    backgroundColor: "#00bfff",
    color: "#121212",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1.1rem",
    boxShadow: "0 0 8px #00bfff",
    transition: "all 0.3s ease",
  }
};

export default About;
