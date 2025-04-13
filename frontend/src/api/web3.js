import Web3 from "web3";

let web3;
let contract;

const initializeWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }

  const contractAddress = "0x14d257f9B2B41B617CA7B80Acd18d3D13b3a862f";
  const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "candidatesCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "getCandidate",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
  
  contract = new web3.eth.Contract(contractABI, contractAddress);
};

export const connectWallet = async () => {
  try {
    await initializeWeb3();
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  } catch (error) {
    console.error("Wallet connection failed:", error);
    return null;
  }
};

export const getCandidates = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/candidates");
    const candidates = await response.json();
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};

export const voteForCandidate = async (id) => {
  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.vote(id).send({ from: accounts[0] });
    return true;
  } catch (error) {
    console.error("Voting failed:", error);
    throw error;
  }
};

// New function to check if the user has already voted
export const checkIfVoted = async (address) => {
  try {
    await initializeWeb3();
    const hasVoted = await contract.methods.hasVoted(address).call();
    return hasVoted;
  } catch (error) {
    console.error("Error checking voting status:", error);
    return false;
  }
};