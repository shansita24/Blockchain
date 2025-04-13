import React, { useState, useEffect } from "react";

const BlockchainStatus = () => {
  const [status, setStatus] = useState({
    isConnected: false,
    network: "Disconnected",
    blockNumber: null
  });

  useEffect(() => {
    const checkStatus = async () => {
      if (window.ethereum) {
        try {
          // Get chain ID
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          
          // Map chain ID to network name
          const networks = {
            "0x1": "Ethereum Mainnet",
            "0x3": "Ropsten Testnet",
            "0x4": "Rinkeby Testnet",
            "0x5": "Goerli Testnet",
            "0x89": "Polygon Mainnet"
          };
          
          setStatus({
            isConnected: true,
            network: networks[chainId] || `Chain ${parseInt(chainId, 16)}`,
            blockNumber: Math.floor(Math.random() * 1000000) + 15000000 // Simulated block for demo
          });
        } catch (error) {
          console.error("Error checking blockchain status:", error);
          setStatus({
            isConnected: false,
            network: "Error",
            blockNumber: null
          });
        }
      }
    };
    
    checkStatus();
    
    // Simulate block updates
    const interval = setInterval(() => {
      setStatus(prev => {
        if (prev.isConnected && prev.blockNumber) {
          return {
            ...prev,
            blockNumber: prev.blockNumber + 1
          };
        }
        return prev;
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: status.isConnected ? '#10b981' : '#ef4444',
          marginRight: '8px'
        }}></div>
        <span style={{ fontWeight: 'medium' }}>Blockchain Status</span>
      </div>
      
      <div style={{ fontSize: '14px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '4px'
        }}>
          <span>Network:</span>
          <span>{status.network}</span>
        </div>
        
        {status.blockNumber && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Block:</span>
            <span>#{status.blockNumber.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainStatus;