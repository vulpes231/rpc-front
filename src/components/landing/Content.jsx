import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import Actionbuttons from "./Actionbuttons";
import { ConnectButton } from "thirdweb/react";
import { chains, client } from "../../constants/constanst";
import { createWallet, embeddedWallet } from "thirdweb/wallets";

const Article = ({ title, info }) => {
  return (
    <article className="flex flex-col gap-2 border border-slate-800 p-6">
      <h4 className="font-semibold text-lg md:text-xl">{title}</h4>
      <p className="font-normal text-slate-400">{info}</p>
    </article>
  );
};

const Content = () => {
  return (
    <section className="w-full p-6 flex flex-col gap-16 lg:gap-24 items-center overflow-auto">
      <div className="flex flex-col items-center gap-6 text-center">
        <Link className="border p-3 border-white">Announcing the Ryan L2</Link>
        <h3 className="text-3xl md:text-5xl font-bold">
          The L2 for Real World Solutions <br className="hidden md:flex" /> in
          Emerging Markets
        </h3>
        <p className="">
          Ryan Portal is the gateway to the Ryan ecosystem, providing access to
          a cost-efficient and scalable <br className="hidden md:flex" /> L2
          network secured by Ethereum and part of the OP Superchain.
        </p>
      </div>
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
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold lg:text-2xl">
          Resource hub of Ryan ecosystem
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Article
            title={"Bridge"}
            info={"Start bridging your tokens by using the $Ryan bridge"}
          />
          <Article
            title={"Documentation"}
            info={"Access the new developer documentation"}
          />
          <Article
            title={"Community"}
            info={"Become a part of a vibrant crypto community"}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 flex-col">
        <h3 className="text-xl md:text-2xl font-semibold">
          Join the conversation
        </h3>
        <p>Be a part of a vibrant community of crypto users and developers.</p>
        <span className="flex items-center gap-4">
          <FaTelegram className="w-10 h-10" />
          <FaDiscord className="w-10 h-10" />
        </span>
      </div>
    </section>
  );
};

export default Content;
