package com.example.backend.controller;

import java.math.BigInteger;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public String vote(@PathVariable int id) throws Exception {
        return blockchainVotingService.voteForCandidate(BigInteger.valueOf(id));
    }

    @GetMapping("/votes/{id}")
    public ResponseEntity<Map<String, Object>> getVoteCount(@PathVariable BigInteger id) {
        try {
            BigInteger voteCount = blockchainVotingService.getVoteCount(id);

            // Construct JSON response manually
            Map<String, Object> response = new HashMap<>();
            response.put("candidateId", id);
            response.put("voteCount", voteCount);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(Collections.singletonMap("error", "Unable to fetch vote count"));
        }
    }


}
