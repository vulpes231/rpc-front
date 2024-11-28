import React from "react";
import { logo } from "../../assets";

const Navbar = () => {
  return (
    <header className="border-b border-slate-800 h-[100px] px-6 lg:px-10 flex items-center justify-center fixed top-0 left-0 w-full bg-black">
      <nav className="flex justify-between items-center w-full">
        <span className="flex items-center gap-2">
          <img src={logo} alt="" className="w-[30px]" />
          <h1 className="uppercase font-bold">ryan</h1>
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
