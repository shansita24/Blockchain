const API_URL = "http://localhost:8080/api";

export const getCandidates = async () => {
  const response = await fetch(`${API_URL}/candidates`);
  return response.json();
};

export const voteForCandidate = async (id) => {
  const response = await fetch(`${API_URL}/blockchain/vote/${id}`, {
    method: "POST",
  });
  return response.json();
};
