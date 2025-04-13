package com.example.backend.service;

import java.math.BigInteger;

import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tuples.generated.Tuple2;
import org.web3j.tx.gas.DefaultGasProvider;

import com.example.backend.contracts.Voting;

import io.github.cdimascio.dotenv.Dotenv;

@Service
public class BlockchainVotingService {

    private final Web3j web3j;
    private final Voting contract;
    private final Credentials credentials;

    public BlockchainVotingService() throws Exception {
        Dotenv dotenv = Dotenv.load(); // Load environment variables
        String rpcUrl = dotenv.get("GANACHE_RPC_URL", "http://127.0.0.1:7545");
        String privateKey = dotenv.get("PRIVATE_KEY");
        String contractAddress = dotenv.get("CONTRACT_ADDRESS");

        this.web3j = Web3j.build(new HttpService(rpcUrl));

        this.credentials = Credentials.create(privateKey);
        System.out.println("Using account: " + credentials.getAddress());

        this.contract = Voting.load(contractAddress, web3j, credentials, new DefaultGasProvider());
    }

    public String voteForCandidate(BigInteger candidateId) throws Exception {
        TransactionReceipt receipt = contract.vote(candidateId).send(); 
        boolean success = !receipt.getLogs().isEmpty();

        return String.format("{\"transactionHash\": \"%s\", \"status\": \"%s\"}",
                receipt.getTransactionHash(),
                success ? "Success" : "Failed");
    }

    public BigInteger getVoteCount(BigInteger candidateId) {
        try {
            Tuple2<String, BigInteger> candidateData = contract.getCandidate(candidateId).send();
            return candidateData.component2();
        } catch (Exception e) {
            System.err.println("Error fetching votes: " + e.getMessage());
            return BigInteger.valueOf(-1); // Error indicator
        }
    }

}
