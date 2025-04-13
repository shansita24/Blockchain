import React, { useState, useEffect } from "react";
import {
  getCandidates,
  voteForCandidate,
  checkIfVoted,
} from "../api/web3";

const Home = ({ walletAddress }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCandidates();
        setCandidates(data);

        if (walletAddress) {
          const voted = await checkIfVoted(walletAddress);
          setHasVoted(voted);
        }
      } catch (err) {
        setError("Failed to load candidates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [walletAddress]);

  const handleVote = async (candidateId) => {
    try {
      await voteForCandidate(candidateId);
      alert("Vote cast successfully!");
      setHasVoted(true);
    } catch (err) {
      alert("Voting failed. You may have already voted.");
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading candidates...</p>
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
      <div style={styles.errorBox}>
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!walletAddress) {
    return (
      <div style={styles.alertBox}>
        <p style={{ fontWeight: "bold" }}>Wallet Not Connected</p>
        <p>Please connect your wallet to vote.</p>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div style={styles.successBox}>
        <p style={{ fontWeight: "bold" }}>You have already voted!</p>
        <p>Thank you for participating in the election.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={styles.header}>Blockchain Voting System</h1>

      <div style={styles.grid}>
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = styles.card.boxShadow;
            }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.avatar}>
                {candidate.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div style={styles.cardBody}>
              <h2 style={styles.cardTitle}>{candidate.name}</h2>
              <div style={styles.cardMeta}>
                <span>ID: {candidate.id}</span>
              </div>
              <button
                onClick={() => handleVote(candidate.id)}
                style={styles.voteButton}
              >
                Vote for Candidate
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        Blockchain Voting System © {new Date().getFullYear()}
        <br />
        Powered by Ethereum Blockchain
      </footer>
    </div>
  );
};

const styles = {
  header: {
    fontSize: "36px",
    fontWeight: 800,
    textAlign: "center",
    color: "#4c1d95",
    marginBottom: "32px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    textAlign: "center",
    padding: "16px",
  },
  spinner: {
    width: "64px",
    height: "64px",
    border: "4px solid transparent",
    borderTopColor: "#8b5cf6",
    borderBottomColor: "#8b5cf6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "16px",
    color: "#8b5cf6",
    fontWeight: 500,
  },
  errorBox: {
    maxWidth: "400px",
    margin: "80px auto",
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    borderLeft: "4px solid #ef4444",
    color: "#ef4444",
    padding: "24px",
    borderRadius: "6px",
    textAlign: "center",
  },
  alertBox: {
    maxWidth: "500px",
    margin: "80px auto",
    backgroundColor: "rgba(234, 179, 8, 0.1)",
    borderLeft: "4px solid #eab308",
    color: "#854d0e",
    padding: "24px",
    borderRadius: "6px",
    textAlign: "center",
  },
  successBox: {
    maxWidth: "500px",
    margin: "80px auto",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderLeft: "4px solid #10b981",
    color: "#065f46",
    padding: "24px",
    borderRadius: "6px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardHover: {
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  cardHeader: {
    backgroundColor: "#4c1d95",
    padding: "16px",
    textAlign: "center",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#6b7280",
  },
  cardBody: {
    padding: "16px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#1f2937",
  },
  cardMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    color: "#6b7280",
    fontSize: "14px",
  },
  voteButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#8b5cf6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    marginTop: "64px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
  },
};

export default Home;
