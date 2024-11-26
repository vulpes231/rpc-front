import React from "react";
import Connectbutton from "./Connectbutton";

const Navbar = () => {
  return (
    <header className="border-b border-slate-800 h-[100px] px-6 lg:px-10 flex items-center justify-center">
      <nav className="flex justify-between items-center w-full">
        <h1 className="uppercase font-bold">$ryan</h1>
        <Connectbutton />
      </nav>
    </header>
  );
};

export default Navbar;
