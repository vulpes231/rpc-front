// src/App.js
import React from "react";
import "./App.css";
import MetaMaskButton from "./MetaMaskButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MetaMask Network Switcher</h1>
        <MetaMaskButton />
      </header>
    </div>
  );
}

export default App;
