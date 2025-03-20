// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;

    event CandidateAdded(uint id, string name);
    event Voted(address voter, uint candidateId);
    event ContractDeployed(address deployer);  // Debugging Event

    constructor() {
        emit ContractDeployed(msg.sender); 
    }

    function addCandidate(string memory _name) public {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name);
    }


    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted!");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID!");

        candidates[_candidateId].voteCount++;
        voters[msg.sender] = true;

        emit Voted(msg.sender, _candidateId);
    }

    function getVoteCount(uint _candidateId) public view returns (uint) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID!");
        return candidates[_candidateId].voteCount;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        uint index = 0;
        for (uint i = 1; i <= candidatesCount; i++) {
            if (bytes(candidates[i].name).length > 0) {  // Ensure candidate exists
                allCandidates[index] = candidates[i];
                index++;
            }
        }
        return allCandidates;
    }
}
