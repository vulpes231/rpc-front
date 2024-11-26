import React from "react";
import { MdHome, MdSendTimeExtension } from "react-icons/md";
import { FaExchangeAlt, FaUserShield } from "react-icons/fa";
import { PiCubeTransparentFill } from "react-icons/pi";
import { TiGroup } from "react-icons/ti";
import { TbUsersGroup } from "react-icons/tb";

const sidebarLinks = [
  {
    id: 1,
    name: "home",
  },
  {
    id: 2,
    name: "airdrop",
  },
  {
    id: 3,
    name: "bridge",
  },
  {
    id: 4,
    name: "migrate from L1",
  },
  {
    id: 5,
    name: "ryan DAO",
  },
  {
    id: 6,
    name: "ecosystem",
  },
  {
    id: 7,
    name: "stake",
  },
];

const Sidebar = () => {
  const myLinks = sidebarLinks.map((link) => {
    const icons =
      link.name == "home" ? (
        <MdHome />
      ) : link.name == "airdrop" ? (
        <FaUserShield />
      ) : link.name == "stake" ? (
        <PiCubeTransparentFill />
      ) : link.name == "ecosystem" ? (
        <TiGroup />
      ) : link.name.includes("migrate") ? (
        <MdSendTimeExtension />
      ) : link.name == "bridge" ? (
        <FaExchangeAlt />
      ) : link.name.includes("DAO") ? (
        <TbUsersGroup />
      ) : null;
    return (
      <li className="capitalize flex items-center gap-5" key={link.id}>
        <span>{icons}</span>
        <span>{link.name}</span>
      </li>
    );
  });
  return (
    <aside
      className={`border-r border-slate-800 hidden lg:flex p-6 w-full lg:w-[350px]`}
    >
      <ul className="flex flex-col gap-6 ">{myLinks}</ul>
    </aside>
  );
};

export default Sidebar;
