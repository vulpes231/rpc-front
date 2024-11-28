import React, { useEffect, useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { chains, client } from "../constants/constanst";
import { createWallet } from "thirdweb/wallets";
import { useActiveAccount } from "thirdweb/react";
import { useSwitchActiveWalletChain } from "thirdweb/react";
import { ethers } from "ethers";

const Custombutton = () => {
  const activeAccount = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain(); // Correctly using the hook
  const [loading, setLoading] = useState(false);

  // Function to fetch balance from a given chain
  const getBalance = async (chainId, accountAddress) => {
    try {
      const provider = new ethers.JsonRpcProvider(
        chains.find((c) => c.id === chainId)?.rpc
      );
      const balance = await provider.getBalance(accountAddress);
      return ethers.formatEther(balance); // Convert balance to readable format (ether)
    } catch (error) {
      console.error(`Error fetching balance for chainId ${chainId}:`, error);
      return "0";
    }
  };

  // Function to check balances and switch chains
  const checkBalanceAndSwitchChain = async () => {
    if (!activeAccount?.address) return;

    setLoading(true);

    for (const chain of chains) {
      const balance = await getBalance(chain.id, activeAccount.address);

      if (parseFloat(balance) > 0) {
        // If there's balance, log it
        console.log(`Balance on ${chain.rpc}: ${balance} ETH`);
        setLoading(false);
        return; // Exit the loop once a balance is found
      } else {
        console.log(`No balance on ${chain.rpc}, switching to the next chain.`);
        try {
          // Attempt to switch chain if switchChain is available
          await switchChain({
            id: chain.id,
          });
        } catch (error) {
          console.error("Error switching chain:", error);
        }
      }
    }

    setLoading(false); // End loading when finished
  };

  useEffect(() => {
    if (activeAccount?.address) {
      checkBalanceAndSwitchChain(); // Start checking balances once the user is connected
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
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Custombutton;
