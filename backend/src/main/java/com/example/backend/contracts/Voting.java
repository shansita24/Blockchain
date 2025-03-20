package com.example.backend.contracts;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple2;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

import io.reactivex.Flowable;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/hyperledger-web3j/web3j/tree/main/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.6.3.
 */
@SuppressWarnings("rawtypes")
public class Voting extends Contract {
    public static final String BINARY = "0x608060405234801562000010575f80fd5b50620000576040518060400160405280600581526020017f416c696365000000000000000000000000000000000000000000000000000000815250620000a360201b60201c565b6200009d6040518060400160405280600381526020017f426f620000000000000000000000000000000000000000000000000000000000815250620000a360201b60201c565b620004ca565b60405180604001604052808281526020015f8152505f8060025481526020019081526020015f205f820151815f019081620000df91906200036d565b506020820151816001015590505060025f81548092919062000101906200047e565b919050555050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806200018557607f821691505b6020821081036200019b576200019a62000140565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302620001ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620001c2565b6200020b8683620001c2565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f620002556200024f620002498462000223565b6200022c565b62000223565b9050919050565b5f819050919050565b620002708362000235565b620002886200027f826200025c565b848454620001ce565b825550505050565b5f90565b6200029e62000290565b620002ab81848462000265565b505050565b5b81811015620002d257620002c65f8262000294565b600181019050620002b1565b5050565b601f8211156200032157620002eb81620001a1565b620002f684620001b3565b8101602085101562000306578190505b6200031e6200031585620001b3565b830182620002b0565b50505b505050565b5f82821c905092915050565b5f620003435f198460080262000326565b1980831691505092915050565b5f6200035d838362000332565b9150826002028217905092915050565b620003788262000109565b67ffffffffffffffff81111562000394576200039362000113565b5b620003a082546200016d565b620003ad828285620002d6565b5f60209050601f831160018114620003e3575f8415620003ce578287015190505b620003da858262000350565b86555062000449565b601f198416620003f386620001a1565b5f5b828110156200041c57848901518255600182019150602085019450602081019050620003f5565b868310156200043c578489015162000438601f89168262000332565b8355505b6001600288020188555050505b505050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6200048a8262000223565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203620004bf57620004be62000451565b5b600182019050919050565b610cab80620004d85f395ff3fe608060405234801561000f575f80fd5b5060043610610060575f3560e01c80630121b93f1461006457806309eef43e146100805780632d35a8a2146100b05780633477ee2e146100ce57806335b8e820146100ff578063462e91ec14610130575b5f80fd5b61007e600480360381019061007991906104fc565b61014c565b005b61009a60048036038101906100959190610581565b6102d2565b6040516100a791906105c6565b60405180910390f35b6100b86102ef565b6040516100c591906105ee565b60405180910390f35b6100e860048036038101906100e391906104fc565b6102f5565b6040516100f6929190610691565b60405180910390f35b610119600480360381019061011491906104fc565b61039a565b604051610127929190610691565b60405180910390f35b61014a600480360381019061014591906107eb565b610456565b005b60015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff16156101d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101cd9061087c565b60405180910390fd5b600254811061021a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610211906108e4565b60405180910390fd5b5f808281526020019081526020015f206001015f81548092919061023d9061092f565b91905055506001805f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff0219169083151502179055507f030b0f8dcd86a031eddb071f91882edeac8173663ba775713b677b42b51be44b81336040516102c7929190610985565b60405180910390a150565b6001602052805f5260405f205f915054906101000a900460ff1681565b60025481565b5f602052805f5260405f205f91509050805f018054610313906109d9565b80601f016020809104026020016040519081016040528092919081815260200182805461033f906109d9565b801561038a5780601f106103615761010080835404028352916020019161038a565b820191905f5260205f20905b81548152906001019060200180831161036d57829003601f168201915b5050505050908060010154905082565b60605f805f8481526020019081526020015f205f015f808581526020019081526020015f20600101548180546103cf906109d9565b80601f01602080910402602001604051908101604052809291908181526020018280546103fb906109d9565b80156104465780601f1061041d57610100808354040283529160200191610446565b820191905f5260205f20905b81548152906001019060200180831161042957829003601f168201915b5050505050915091509150915091565b60405180604001604052808281526020015f8152505f8060025481526020019081526020015f205f820151815f0190816104909190610ba6565b506020820151816001015590505060025f8154809291906104b09061092f565b919050555050565b5f604051905090565b5f80fd5b5f80fd5b5f819050919050565b6104db816104c9565b81146104e5575f80fd5b50565b5f813590506104f6816104d2565b92915050565b5f60208284031215610511576105106104c1565b5b5f61051e848285016104e8565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61055082610527565b9050919050565b61056081610546565b811461056a575f80fd5b50565b5f8135905061057b81610557565b92915050565b5f60208284031215610596576105956104c1565b5b5f6105a38482850161056d565b91505092915050565b5f8115159050919050565b6105c0816105ac565b82525050565b5f6020820190506105d95f8301846105b7565b92915050565b6105e8816104c9565b82525050565b5f6020820190506106015f8301846105df565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b8381101561063e578082015181840152602081019050610623565b5f8484015250505050565b5f601f19601f8301169050919050565b5f61066382610607565b61066d8185610611565b935061067d818560208601610621565b61068681610649565b840191505092915050565b5f6040820190508181035f8301526106a98185610659565b90506106b860208301846105df565b9392505050565b5f80fd5b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6106fd82610649565b810181811067ffffffffffffffff8211171561071c5761071b6106c7565b5b80604052505050565b5f61072e6104b8565b905061073a82826106f4565b919050565b5f67ffffffffffffffff821115610759576107586106c7565b5b61076282610649565b9050602081019050919050565b828183375f83830152505050565b5f61078f61078a8461073f565b610725565b9050828152602081018484840111156107ab576107aa6106c3565b5b6107b684828561076f565b509392505050565b5f82601f8301126107d2576107d16106bf565b5b81356107e284826020860161077d565b91505092915050565b5f60208284031215610800576107ff6104c1565b5b5f82013567ffffffffffffffff81111561081d5761081c6104c5565b5b610829848285016107be565b91505092915050565b7f596f75206861766520616c726561647920766f746564000000000000000000005f82015250565b5f610866601683610611565b915061087182610832565b602082019050919050565b5f6020820190508181035f8301526108938161085a565b9050919050565b7f496e76616c69642063616e6469646174650000000000000000000000000000005f82015250565b5f6108ce601183610611565b91506108d98261089a565b602082019050919050565b5f6020820190508181035f8301526108fb816108c2565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610939826104c9565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361096b5761096a610902565b5b600182019050919050565b61097f81610546565b82525050565b5f6040820190506109985f8301856105df565b6109a56020830184610976565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806109f057607f821691505b602082108103610a0357610a026109ac565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302610a657fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610a2a565b610a6f8683610a2a565b95508019841693508086168417925050509392505050565b5f819050919050565b5f610aaa610aa5610aa0846104c9565b610a87565b6104c9565b9050919050565b5f819050919050565b610ac383610a90565b610ad7610acf82610ab1565b848454610a36565b825550505050565b5f90565b610aeb610adf565b610af6818484610aba565b505050565b5b81811015610b1957610b0e5f82610ae3565b600181019050610afc565b5050565b601f821115610b5e57610b2f81610a09565b610b3884610a1b565b81016020851015610b47578190505b610b5b610b5385610a1b565b830182610afb565b50505b505050565b5f82821c905092915050565b5f610b7e5f1984600802610b63565b1980831691505092915050565b5f610b968383610b6f565b9150826002028217905092915050565b610baf82610607565b67ffffffffffffffff811115610bc857610bc76106c7565b5b610bd282546109d9565b610bdd828285610b1d565b5f60209050601f831160018114610c0e575f8415610bfc578287015190505b610c068582610b8b565b865550610c6d565b601f198416610c1c86610a09565b5f5b82811015610c4357848901518255600182019150602085019450602081019050610c1e565b86831015610c605784890151610c5c601f891682610b6f565b8355505b6001600288020188555050505b50505050505056fea2646970667358221220f1ca5b3001c4bdbf54e28ae2f3d100203a373c93e7d760ae81159363592d461564736f6c63430008140033";

    private static String librariesLinkedBinary;

    public static final String FUNC_CANDIDATES = "candidates";

    public static final String FUNC_CANDIDATESCOUNT = "candidatesCount";

    public static final String FUNC_HASVOTED = "hasVoted";

    public static final String FUNC_ADDCANDIDATE = "addCandidate";

    public static final String FUNC_VOTE = "vote";

    public static final String FUNC_GETCANDIDATE = "getCandidate";

    public static final Event VOTED_EVENT = new Event("Voted", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Address>() {}));
    ;

    @Deprecated
    protected Voting(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Voting(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Voting(String contractAddress, Web3j web3j, TransactionManager transactionManager,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Voting(String contractAddress, Web3j web3j, TransactionManager transactionManager,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<VotedEventResponse> getVotedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(VOTED_EVENT, transactionReceipt);
        ArrayList<VotedEventResponse> responses = new ArrayList<>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            VotedEventResponse typedResponse = new VotedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.candidateId = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.voter = (String) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static VotedEventResponse getVotedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(VOTED_EVENT, log);
        VotedEventResponse typedResponse = new VotedEventResponse();
        typedResponse.log = log;
        typedResponse.candidateId = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.voter = (String) eventValues.getNonIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<VotedEventResponse> votedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getVotedEventFromLog(log));
    }

    public Flowable<VotedEventResponse> votedEventFlowable(DefaultBlockParameter startBlock,
            DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(VOTED_EVENT));
        return votedEventFlowable(filter);
    }

    public RemoteFunctionCall<Tuple2<String, BigInteger>> candidates(BigInteger param0) {
        final Function function = new Function(FUNC_CANDIDATES, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<>(function, () -> {
            List<Type> results = executeCallMultipleValueReturn(function);
            return new Tuple2<>(
                    (String) results.get(0).getValue(),
                    (BigInteger) results.get(1).getValue());
        });
    }

    public RemoteFunctionCall<BigInteger> candidatesCount() {
        final Function function = new Function(FUNC_CANDIDATESCOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Boolean> hasVoted(String param0) {
        final Function function = new Function(FUNC_HASVOTED, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<TransactionReceipt> addCandidate(String _name) {
        final Function function = new Function(
                FUNC_ADDCANDIDATE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(_name)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> vote(BigInteger _candidateId) {
        final Function function = new Function(
                FUNC_VOTE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_candidateId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple2<String, BigInteger>> getCandidate(BigInteger _candidateId) {
        final Function function = new Function(FUNC_GETCANDIDATE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_candidateId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<>(function, () -> {
            List<Type> results = executeCallMultipleValueReturn(function);
            return new Tuple2<String, BigInteger>(
                    (String) results.get(0).getValue(),
                    (BigInteger) results.get(1).getValue());
        });
    }

    @Deprecated
    public static Voting load(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        return new Voting(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Voting load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Voting(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Voting load(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return new Voting(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Voting load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Voting(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Voting> deploy(Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Voting.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), "");
    }

    public static RemoteCall<Voting> deploy(Web3j web3j, TransactionManager transactionManager,
            ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Voting.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<Voting> deploy(Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Voting.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<Voting> deploy(Web3j web3j, TransactionManager transactionManager,
            BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Voting.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), "");
    }

    public static void linkLibraries(List<Contract.LinkReference> references) {
        librariesLinkedBinary = linkBinaryWithReferences(BINARY, references);
    }

    private static String getDeploymentBinary() {
        if (librariesLinkedBinary != null) {
            return librariesLinkedBinary;
        } else {
            return BINARY;
        }
    }

    public static class VotedEventResponse extends BaseEventResponse {
        public BigInteger candidateId;

        public String voter;
    }
}
