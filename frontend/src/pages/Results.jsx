import React, { useState, useEffect } from "react";
import { getCandidates } from "../api/web3";
import AuthPage from "../components/AuthPage";

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    if (authStatus) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchResults = async () => {
    try {
      const data = await getCandidates();
      data.sort((a, b) => b.voteCount - a.voteCount);
      setCandidates(data);
      setTotalVotes(data.reduce((sum, candidate) => sum + Number(candidate.voteCount), 0));
    } catch (err) {
      setError("Failed to load results.");
    } finally {
      setLoading(false);
    }
  };

const handleLogout = () => {
  sessionStorage.removeItem("isAuthenticated");
  window.location.reload(); 
};

<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
  <button
    onClick={handleLogout}
    style={{
      backgroundColor: '#4c1d95',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500'
    }}
  >
    Logout
  </button>
</div>

  const handleLogin = (status) => {
    setIsAuthenticated(status);
    if (status) {
      setLoading(true);
      fetchResults();
    }
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1f2937'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          border: '4px solid transparent',
          borderTopColor: '#8b5cf6',
          borderBottomColor: '#8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{
          marginTop: '16px',
          color: '#a78bfa',
          fontWeight: 500
        }}>Loading results...</p>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        maxWidth: '400px',
        margin: '40px auto',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderLeft: '4px solid #ef4444',
        color: '#ef4444',
        padding: '24px',
        borderRadius: '6px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{
          fontWeight: 'bold',
          fontSize: '18px',
          marginBottom: '8px'
        }}>Error</p>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            marginTop: '16px',
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
        >
          Try Again
        </button>
      </div>
    );
  }

  const getBarColor = (index) => {
    switch (index) {
      case 0: return '#fcd34d'; // yellow
      case 1: return '#94a3b8'; // gray
      case 2: return '#b45309'; // amber
      default: return '#3b82f6'; // blue
    }
  };

  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => {
            sessionStorage.removeItem("isAuthenticated");
            setIsAuthenticated(false);
          }}
          style={{
            backgroundColor: '#4c1d95',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Logout
        </button>
      </div>

      <h1 style={{
        textAlign: 'center',
        fontSize: '36px',
        fontWeight: 800,
        marginBottom: '16px',
        color: '#4c1d95'
      }}>
        Election Results
      </h1>
      
      <p style={{
        textAlign: 'center',
        color: '#6b7280',
        marginBottom: '40px'
      }}>
        Total votes cast: {totalVotes}
      </p>

      {/* Rest of your Results component remains the same */}
      {candidates.length > 0 ? (
        <div style={{
          maxWidth: '1024px',
          margin: '0 auto',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <table style={{
            width: '100%',
            textAlign: 'left',
            borderCollapse: 'collapse'
          }}>
            <thead style={{
              backgroundColor: '#4c1d95',
              color: 'white',
              textTransform: 'uppercase'
            }}>
              <tr>
                <th style={{ padding: '16px 24px', fontWeight: 600, width: '80px' }}>Rank</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Candidate</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Votes</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr
                  key={candidate.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f8fafc' : '#f1f5f9',
                    borderBottom: '1px solid #e2e8f0',
                    color: '#1f2937'
                  }}
                >
                  <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '30px',
                      height: '30px',
                      lineHeight: '30px',
                      textAlign: 'center',
                      backgroundColor: index < 3 ? '#4c1d95' : '#e2e8f0',
                      color: index < 3 ? 'white' : '#1f2937',
                      borderRadius: '50%',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: 500 }}>{candidate.name}</td>
                  <td style={{ padding: '16px 24px' }}>{candidate.voteCount}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '100%',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '9999px',
                        height: '10px',
                        marginRight: '8px'
                      }}>
                        <div 
                          style={{
                            height: '10px',
                            borderRadius: '9999px',
                            backgroundColor: getBarColor(index),
                            width: `${totalVotes > 0 ? (candidate.voteCount / totalVotes) * 100 : 0}%`
                          }}
                        ></div>
                      </div>
                      <span>
                        {totalVotes > 0 ? ((candidate.voteCount / totalVotes) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#6b7280',
          fontSize: '18px'
        }}>
          <p>No election results available yet.</p>
        </div>
      )}
    </div>
  );
};

export default Results;
