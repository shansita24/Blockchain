package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

@Service
public class BlockchainService {

    private final Web3j web3j;

    public BlockchainService() {
        this.web3j = Web3j.build(new HttpService("http://127.0.0.1:7545")); // Connect to Ganache
    }

    public String getBlockchainInfo() throws Exception {
        return web3j.web3ClientVersion().send().getWeb3ClientVersion();
    }
}
