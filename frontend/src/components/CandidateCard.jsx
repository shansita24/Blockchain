import React, { useState } from "react";
import { voteForCandidate } from "../api/web3";
import { toast } from "react-toastify";
import { CheckCircle, Loader2, Vote, User, Award, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const CandidateCard = ({ candidate, walletAddress }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleVote = async () => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first.");
      return;
    }

    setIsVoting(true);

    try {
      await voteForCandidate(candidate.id);

      // Optionally sync with backend
      await fetch(`http://localhost:8080/api/blockchain/vote/${candidate.id}`, {
        method: "POST",
      });

      setVoted(true);
      toast.success(`Voted for ${candidate.name}!`);
    } catch (err) {
      toast.error("Voting failed. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      "from-blue-600 to-indigo-700",
      "from-purple-600 to-pink-700",
      "from-green-600 to-teal-700",
      "from-red-600 to-orange-700",
      "from-yellow-600 to-amber-700",
    ];
    // Use candidate.id to get consistent gradient for each candidate
    const index = parseInt(candidate.id) % gradients.length;
    return gradients[index];
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300"
    >
      {/* Candidate header with gradient */}
      <div className={`bg-gradient-to-r ${getRandomGradient()} p-4 relative h-24 flex items-center justify-center`}>
        <User size={40} className="text-white/80 absolute" />
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-full p-2 border-4 border-gray-800">
          <User size={50} className="text-white" />
        </div>
      </div>
      
      {/* Candidate details */}
      <div className="pt-12 px-6 pb-6">
        <h2 className="text-2xl font-bold text-white text-center mb-3 flex items-center justify-center gap-2">
          {candidate.name}
        </h2>
        
        <div className="mb-6 mt-4">
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ThumbsUp size={16} className="text-blue-400 mr-1" />
                <span className="text-blue-400 font-semibold text-sm">Vote Count</span>
              </div>
              <span className="text-white font-bold bg-blue-900/30 py-1 px-3 rounded-full text-sm">
                {candidate.voteCount}
              </span>
            </div>
            <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(candidate.voteCount * 5, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              ></motion.div>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleVote}
          disabled={isVoting || voted || !walletAddress}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 ${
            voted
              ? "bg-green-600 hover:bg-green-700"
              : isVoting
              ? "bg-gray-700 cursor-wait"
              : !walletAddress
              ? "bg-gray-700 cursor-not-allowed opacity-60"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-900/30"
          }`}
        >
          {voted ? (
            <>
              <CheckCircle size={20} />
              <span>Voted Successfully</span>
            </>
          ) : isVoting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Vote size={20} className={hovered ? "animate-pulse" : ""} />
              <span>Cast Your Vote</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
