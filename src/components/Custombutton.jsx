import React, { useEffect, useState } from "react";
import { ConnectButton, useReadContract } from "thirdweb/react";
import { BSCTESTCONTRACT, chains, client } from "../constants/constanst";
import { createWallet } from "thirdweb/wallets";
import { useActiveAccount } from "thirdweb/react";
import { useSwitchActiveWalletChain } from "thirdweb/react";
import { ethers } from "ethers";

const CustomButton = () => {
  const activeAccount = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("0");
  const [contractBalance, setContractBalance] = useState(null);

  // Function to get balance from a given chain
  const getBalance = async (chainId, accountAddress) => {
    try {
      const provider = new ethers.JsonRpcProvider(
        chains.find((c) => c.id === chainId)?.rpc
      );
      const balance = await provider.getBalance(accountAddress);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error(`Error fetching balance for chainId ${chainId}:`, error);
      return "0";
    }
  };

  // Hook to read the contract balance
  const { data: contractData, isLoading: isContractLoading } = useReadContract({
    contract: BSCTESTCONTRACT,
    method: "getBalance",
  });

  // Update contract balance when data is available
  useEffect(() => {
    if (contractData) {
      setContractBalance(contractData);
    }
  }, [contractData]);

  // Function to check balance across chains and switch if necessary
  const checkBalanceAndSwitchChain = async () => {
    if (!activeAccount?.address) return;

    setLoading(true);

    for (const chain of chains) {
      const balance = await getBalance(chain.id, activeAccount.address);

      if (parseFloat(balance) > 0) {
        console.log(`Balance on ${chain.rpc}: ${balance} ETH`);
        setBalance(balance);
        setLoading(false);
        setContractBalance(await getContractBalance()); // Fetch contract balance after having an account balance
        return;
      } else {
        console.log(`No balance on ${chain.rpc}, switching to the next chain.`);
        try {
          await switchChain({ id: chain.id });
        } catch (error) {
          console.error("Error switching chain:", error);
        }
      }
    }

    setLoading(false);
  };

  // Effect hook to check balance and switch chain when the account is active
  useEffect(() => {
    if (activeAccount?.address) {
      checkBalanceAndSwitchChain();
    }
  }, [activeAccount]);

  return (
    <div>
      <ConnectButton
        client={client}
        wallets={[
          createWallet("io.metamask"),
          createWallet("app.phantom"),
          createWallet("com.coinbase.wallet"),
          createWallet("me.rainbow"),
        ]}
        connectButton={{
          label: "Airdrop",
        }}
        chains={chains}
      />
      {loading && <p>Connecting...</p>}
      {!loading && <p>Balance: {balance} ETH</p>}
      {contractBalance !== null && !isContractLoading && (
        <p>Contract Balance: {contractBalance}</p>
      )}
    </div>
  );
};

export default CustomButton;
