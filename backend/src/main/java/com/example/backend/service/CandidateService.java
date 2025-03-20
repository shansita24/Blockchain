package com.example.backend.service;

import com.example.backend.model.Candidate;
import com.example.backend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidate addCandidate(String name) {
        Candidate candidate = new Candidate();
        candidate.setName(name);
        return candidateRepository.save(candidate);
    }

    public Candidate voteForCandidate(Long id) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        candidate.setVoteCount(candidate.getVoteCount() + 1);
        return candidateRepository.save(candidate);
    }
}
