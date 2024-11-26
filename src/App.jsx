import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const projectId = import.meta.env.VITE_PROJECT_ID;

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const bsctestnet = {
  chainId: 97,
  name: "BNB TestNet",
  currency: "tBNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://data-seed-prebsc-2-s2.bnbchain.org:8545",
};

// 3. Create a metadata object
const metadata = {
  name: "RT Portal",
  description: "Ryan Portal",
  url: "http://localhost:5173",
  icons: ["./ryan.png"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: "...",
  defaultChainId: 1,
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, bsctestnet],
  projectId,
  enableAnalytics: true,
});

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
};

export default App;
