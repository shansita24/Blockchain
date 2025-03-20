package com.example.backend.service;

import java.math.BigInteger;

import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

import com.example.backend.contracts.Voting;

@Service
public class BlockchainVotingService {

    private final Web3j web3j;
    private final Voting contract;

    public BlockchainVotingService() throws Exception {
        this.web3j = Web3j.build(new HttpService("http://127.0.0.1:7545"));

        Credentials credentials = Credentials.create("0x3a1db2393b765bb2470726a8fca9c5499b39ce1cf46b436630279ab7cb5766ed");

        this.contract = Voting.load("0x14d257f9B2B41B617CA7B80Acd18d3D13b3a862f", web3j, credentials, new DefaultGasProvider());
    }

    public String voteForCandidate(BigInteger candidateId) throws Exception {
        TransactionReceipt receipt = contract.vote(candidateId).send();
        return receipt.getTransactionHash();
    }

    public BigInteger getVoteCount(BigInteger candidateId) throws Exception {
        return contract.getCandidate(candidateId).send().component2();
    }
}
