// import Web3 from "web3";

// let web3;
// if (window.ethereum) {
//   web3 = new Web3(window.ethereum);
// } else {
//   console.error("MetaMask not detected! Please install MetaMask.");
// }

// const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS"; // Replace with deployed contract address
// const contractABI = [ /* Your contract's ABI */ ];  // Replace with actual ABI

// const contract = new web3.eth.Contract(contractABI, contractAddress);

// export const connectWallet = async () => {
//   if (!window.ethereum) {
//     alert("MetaMask not installed!");
//     return null;
//   }

//   try {
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     return accounts[0]; // Return the connected wallet address
//   } catch (error) {
//     console.error("Wallet connection failed", error);
//     return null;
//   }
// };

// export const getCandidates = async () => {
//   try {
//     const candidates = await contract.methods.getCandidates().call();
//     return candidates.map((candidate, index) => ({
//       id: index,
//       name: candidate.name,
//       voteCount: candidate.voteCount,
//     }));
//   } catch (error) {
//     console.error("Error fetching candidates", error);
//     return [];
//   }
// };

// export const voteForCandidate = async (candidateId, walletAddress) => {
//   try {
//     await contract.methods.vote(candidateId).send({ from: walletAddress });
//     return true;
//   } catch (error) {
//     console.error("Voting failed", error);
//     return false;
//   }
// };

// export default web3;


import Web3 from "web3";

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  console.warn("MetaMask not detected! Running in mock mode.");
  const mockProvider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
  web3 = new Web3(mockProvider);
}

// Smart contract details
const contractAddress = "0xYourSmartContractAddress"; // Replace with actual contract address
const contractABI = []; // Replace with your contract ABI

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to connect wallet
export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected! Please install MetaMask.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0]; // Return the connected wallet address
  } catch (error) {
    console.error("User denied account access", error);
    return null;
  }
};

// Function to fetch candidates
export const getCandidates = async () => {
  try {
    const candidates = await contract.methods.getAllCandidates().call();
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};

// Function to vote for a candidate
export const voteForCandidate = async (candidateId, voterAddress) => {
  try {
    await contract.methods.vote(candidateId).send({ from: voterAddress });
    return true;
  } catch (error) {
    console.error("Error voting:", error);
    return false;
  }
};

export default web3;
