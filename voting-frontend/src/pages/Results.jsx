import React, { useEffect, useState } from "react";
import { getCandidates } from "../api/web3";

const Results = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getCandidates().then(setCandidates);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voting Results</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Candidate</th>
              <th className="px-4 py-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="border px-4 py-2">{candidate.name}</td>
                <td className="border px-4 py-2">{candidate.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
