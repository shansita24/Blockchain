import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import BlockchainStatus from './components/BlockchainStatus';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask to use this application");
    }
  };

  useEffect(() => {
    // Check if wallet is already connected
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        })
        .catch(console.error);
    }
  }, []);

  return (
    <Router>
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
        {/* Sidebar */}
        <aside style={{
          width: '280px',
          flexShrink: 0,
          backgroundColor: '#111827',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          zIndex: 10
        }}>
          {/* Logo Area */}
          <div style={{
            padding: '24px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#8b5cf6'
            }}>BlockVote</h1>
          </div>
          
          {/* Navigation Links */}
          <nav style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0'
          }}>
            <NavLink 
              to="/" 
              style={({ isActive }) => ({
                padding: '14px 20px',
                margin: '4px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#d1d5db',
                backgroundColor: isActive ? '#4c1d95' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              })}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/results" 
              style={({ isActive }) => ({
                padding: '14px 20px',
                margin: '4px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#d1d5db',
                backgroundColor: isActive ? '#4c1d95' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              })}
            >
              Results
            </NavLink>
          </nav>
          
          {/* Wallet Section */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {walletAddress ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%'
                }}></div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>Connected</div>
                  <div style={{ fontSize: '14px', color: 'white' }}>
                    {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Connect Wallet
              </button>
            )}
          </div>
          
          {/* Blockchain Status */}
          <div style={{
            padding: '16px',
            marginTop: 'auto',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '14px',
            color: '#9ca3af'
          }}>
            <BlockchainStatus />
          </div>
        </aside>
        
        {/* Main Content */}
        <main style={{
          flexGrow: 1,
          flexBasis: 0,
          minWidth: 0,
          padding: '30px',
          backgroundColor: '#f9fafb',
          overflowY: 'auto',
          height: '100%'
        }}>
          <Routes>
            <Route path="/" element={<Home walletAddress={walletAddress} />} />
            <Route 
              path="/results" 
              element={
                <ProtectedRoute component={Results} />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
