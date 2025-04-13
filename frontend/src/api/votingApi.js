const API_URL = "http://localhost:8080/api";

export const getCandidates = async () => {
  const response = await fetch(`${API_URL}/candidates`);
  if (!response.ok) {
    throw new Error("Failed to fetch candidates");
  }
  return response.json();
};

export const syncWithBlockchain = async (id) => {
  const response = await fetch(`${API_URL}/blockchain/vote/${id}`, {
    method: "POST",
  });
  
  if (!response.ok) {
    throw new Error("Failed to sync vote with backend");
  }
  
  return response.json();
};

export const getVoteCount = async (id) => {
  const response = await fetch(`${API_URL}/blockchain/votes/${id}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch vote count");
  }
  
  return response.json();
};
