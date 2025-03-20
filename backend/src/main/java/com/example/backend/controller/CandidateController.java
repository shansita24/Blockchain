package com.example.backend.controller;

import com.example.backend.model.Candidate;
import com.example.backend.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "*")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @GetMapping
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @PostMapping("/add")
    public Candidate addCandidate(@RequestParam String name) {
        return candidateService.addCandidate(name);
    }

    @PostMapping("/vote/{id}")
    public Candidate vote(@PathVariable Long id) {
        return candidateService.voteForCandidate(id);
    }
}
