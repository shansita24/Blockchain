import React from "react";

const CandidateCard = ({ candidate, onVote }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2">
      <h2 className="text-lg font-bold">{candidate.name}</h2>
      <p className="text-gray-600">Votes: {candidate.voteCount}</p>
      <button
        onClick={() => onVote(candidate.id)}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
      >
        Vote
      </button>
    </div>
  );
};

export default CandidateCard;
