import React from "react";
import { Content, Navbar, Sidebar } from "../components";

const Landing = () => {
  return (
    <section className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex h-full customHeight mt-[100px] ">
        <Sidebar />
        <Content />
      </div>
    </section>
  );
};

export default Landing;
