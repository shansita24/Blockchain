package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import io.github.cdimascio.dotenv.Dotenv;

@Service
public class BlockchainService {

    private final Web3j web3j;

    public BlockchainService() {
        Dotenv dotenv = Dotenv.load();
        String rpcUrl = dotenv.get("GANACHE_RPC_URL", "http://127.0.0.1:7545");
        this.web3j = Web3j.build(new HttpService(rpcUrl)); // Connect to Ganache
    }

    public String getBlockchainInfo() {
        try {
            return web3j.web3ClientVersion().send().getWeb3ClientVersion();
        } catch (Exception e) {
            return "Error fetching blockchain info: " + e.getMessage();
        }
    }
}
