// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidatesCount;

    event Voted(uint candidateId, address voter);

    constructor() {
        addCandidate("Alice");
        addCandidate("Bob");
    }

    function addCandidate(string memory _name) public {
        candidates[candidatesCount] = Candidate(_name, 0);
        candidatesCount++;
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(_candidateId < candidatesCount, "Invalid candidate");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(_candidateId, msg.sender);
    }

    function getCandidate(uint _candidateId) public view returns (string memory, uint) {
        return (candidates[_candidateId].name, candidates[_candidateId].voteCount);
    }
}
