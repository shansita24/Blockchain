import React, { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";
import { getCandidates, voteForCandidate, connectWallet } from "../api/web3";

const Home = () => {
  const [candidates, setCandidates] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    getCandidates().then(setCandidates);
  }, []);

  const handleVote = async (id) => {
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }

    const success = await voteForCandidate(id, walletAddress);
    if (success) {
      alert("Vote successful!");
      getCandidates().then(setCandidates);
    } else {
      alert("Vote failed. Make sure you're eligible to vote.");
    }
  };

  const connectWalletHandler = async () => {
    const address = await connectWallet();
    setWalletAddress(address);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Voting System</h1>
        <button
          onClick={connectWalletHandler}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} onVote={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default Home;
