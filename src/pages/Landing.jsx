import React from "react";
import { Content, Navbar, Sidebar } from "../components";

const Landing = () => {
  return (
    <section className="h-screen">
      <Navbar />
      <div className="flex h-full customHeight">
        <Sidebar />
        <Content />
      </div>
    </section>
  );
};

export default Landing;
