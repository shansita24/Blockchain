package com.example.backend;

import java.math.BigInteger;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.BlockchainVotingService;

@RestController
@RequestMapping("/api/blockchain")
@CrossOrigin(origins = "*")
public class BlockchainController {

    private final BlockchainVotingService blockchainVotingService;

    public BlockchainController(BlockchainVotingService blockchainVotingService) {
        this.blockchainVotingService = blockchainVotingService;
    }

    @PostMapping("/vote/{id}")
    public String vote(@PathVariable int id) {
        try {
            return blockchainVotingService.voteForCandidate(BigInteger.valueOf(id));
        } catch (Exception e) {
            return "Error while voting: " + e.getMessage();
        }
    }

    @GetMapping("/votes/{id}")
    public BigInteger getVotes(@PathVariable int id) {
        try {
            return blockchainVotingService.getVoteCount(BigInteger.valueOf(id));
        } catch (Exception e) {
            e.printStackTrace();
            return BigInteger.valueOf(-1); // Indicates an error
        }
    }
}
