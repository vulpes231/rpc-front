import React from "react";

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
];

const Sidebar = () => {
  const myLinks = sidebarLinks.map((link) => {
    return (
      <li className="capitalize" key={link.id}>
        {link.name}
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
