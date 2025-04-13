// components/AuthPage.jsx
import React, { useState } from "react";

const AuthPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === "admin" && password === "bvote2025") {
      sessionStorage.setItem("isAuthenticated", "true");
      onLogin(true);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '16px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '32px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '24px',
          color: '#4c1d95',
          textAlign: 'center'
        }}>
          Admin Authentication
        </h1>
        
        {error && (
          <div style={{
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            borderLeft: '4px solid #ef4444',
            color: '#ef4444',
            padding: '12px',
            marginBottom: '16px',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label 
              htmlFor="username"
              style={{
                display: 'block',
                marginBottom: '8px',
                color: '#4b5563',
                fontWeight: '500'
              }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label 
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '8px',
                color: '#4b5563',
                fontWeight: '500'
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              placeholder="Enter password"
              required
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#8b5cf6',
              color: 'white',
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
