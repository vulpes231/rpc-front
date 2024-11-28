import { defineChain, createThirdwebClient, getContract } from "thirdweb";
import { bscTestNetContractAddress, contractABI } from "../contract/contract";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const client = createThirdwebClient({
  clientId: CLIENT_ID,
});

const bsctest = defineChain({
  id: 97,
  rpc: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
});

const arbitrum = defineChain({
  id: 42161,
  rpc: "https://arb1.arbitrum.io/rpc",
});

const bnbmain = defineChain({
  id: 56,
  rpc: "wss://bsc-rpc.publicnode.com",
});

const avalanche = defineChain({
  id: 43114,
  rpc: "https://avalanche-c-chain-rpc.publicnode.com",
});

const chains = [bsctest]; //arbitrum, bnbmain, avalanche,

const BSCTESTCONTRACT = getContract({
  client: client,
  chain: bsctest,
  address: bscTestNetContractAddress,
  abi: contractABI,
});

export { client, chains, BSCTESTCONTRACT };
