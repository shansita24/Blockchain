package com.example.backend.controller;

import com.example.backend.service.BlockchainVotingService;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController
@RequestMapping("/api/blockchain")
@CrossOrigin(origins = "*")
public class BlockchainController {

    private final BlockchainVotingService blockchainVotingService;

    public BlockchainController(BlockchainVotingService blockchainVotingService) {
        this.blockchainVotingService = blockchainVotingService;
    }

    @PostMapping("/vote/{id}")
    public String vote(@PathVariable int id) throws Exception {
        return blockchainVotingService.voteForCandidate(BigInteger.valueOf(id));
    }

    @GetMapping("/votes/{id}")
    public BigInteger getVotes(@PathVariable int id) throws Exception {
        return blockchainVotingService.getVoteCount(BigInteger.valueOf(id));
    }
}
