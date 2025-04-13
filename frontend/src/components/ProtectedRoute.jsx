// components/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react';
import AuthPage from './AuthPage';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    setIsCheckingAuth(false);
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  if (isCheckingAuth) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e5e7eb',
          borderTopColor: '#8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
