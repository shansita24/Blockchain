package com.example.backend.service;

import java.math.BigInteger;

import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

import com.example.backend.contracts.Voting;

import io.github.cdimascio.dotenv.Dotenv;

@Service
public class BlockchainVotingService {

    private final Web3j web3j;
    private final Voting contract;

    Dotenv dotenv = Dotenv.load();
    String privateKey = dotenv.get("GANACHE_PRIVATE_KEY");
    String contractAddress = dotenv.get("CONTRACT_ADDRESS"); 

    public BlockchainVotingService() throws Exception {
        this.web3j = Web3j.build(new HttpService("http://127.0.0.1:7545"));

        Credentials credentials = Credentials.create(privateKey);

        this.contract = Voting.load(contractAddress, web3j, credentials, new DefaultGasProvider());
    }

    public String voteForCandidate(BigInteger candidateId) throws Exception {
        TransactionReceipt receipt = contract.vote(candidateId).send();
        return receipt.getTransactionHash();
    }

    public BigInteger getVoteCount(BigInteger candidateId) throws Exception {
        return contract.getCandidate(candidateId).send().component2();
    }
}
