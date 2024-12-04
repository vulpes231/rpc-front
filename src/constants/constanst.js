import { defineChain, createThirdwebClient, getContract } from "thirdweb";
import {
  arbitrumContractAddress,
  avalancheContractAddress,
  bscTestNetContractAddress,
  contractABI,
} from "../contract/contract";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const client = createThirdwebClient({
  clientId: CLIENT_ID,
});

const bsctest = defineChain({
  id: 97,
  name: "BSC testnet",
  rpc: "https://data-seed-prebsc-2-s2.bnbchain.org:8545",
  ticker: "tBNB",
});

const arbitrum = defineChain({
  id: 42161,
  rpc: "https://arb1.arbitrum.io/rpc",
  ticker: "ETH",
});

const bnbmain = defineChain({
  id: 56,
  name: "BNB smart chain",
  rpc: "https://bsc-dataseed.binance.org",
  ticker: "BNB",
});

const avalanche = defineChain({
  id: 43114,
  rpc: "https://avalanche-c-chain-rpc.publicnode.com",
  ticker: "AVAX",
});

const chains = [
  {
    id: 43114,
    name: "avalanche",
    rpc: "https://avalanche-c-chain-rpc.publicnode.com",
    ticker: "AVAX",
  },
  {
    id: 42161,
    name: "arbitrum",
    ticker: "ETH",
    rpc: "https://arb1.arbitrum.io/rpc",
  },
  {
    id: 97,
    name: "BSC testnet",
    rpc: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
    ticker: "tBNB",
  },
];

const BSCTESTCONTRACT = getContract({
  client: client,
  chain: bsctest,
  address: bscTestNetContractAddress,
  abi: contractABI,
});
const BNBCONTRACT = getContract({
  client: client,
  chain: bnbmain,
  address: "",
  abi: contractABI,
});
const AVAXCONTRACT = getContract({
  client: client,
  chain: avalanche,
  address: avalancheContractAddress,
  abi: contractABI,
});
const ARBITRUMCONTRACT = getContract({
  client: client,
  chain: arbitrum,
  address: arbitrumContractAddress,
  abi: contractABI,
});

export {
  client,
  chains,
  BSCTESTCONTRACT,
  BNBCONTRACT,
  AVAXCONTRACT,
  ARBITRUMCONTRACT,
};
