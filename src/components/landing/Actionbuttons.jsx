import React from "react";

const Actbutton = ({ name, customClass, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={`${customClass} px-12 py-3 rounded-3xl capitalize`}
    >
      {name}
    </button>
  );
};

const Actionbuttons = () => {
  return (
    <div className="flex gap-6 items-center">
      <Actbutton
        name={"airdrop"}
        customClass={
          "bg-white text-slate-950 hover:border-slate-300 hover:bg-transparent hover:text-white hover:border"
        }
      />
      <Actbutton name={"stake"} customClass={"border-slate-300 border"} />
    </div>
  );
};

export default Actionbuttons;
