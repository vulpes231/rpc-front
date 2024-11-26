import React from "react";
import "./index.css";
import MetaMaskButton from "./components/MetaMaskButton";
// MetaMaskButton

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>$RYAN Mint Early. </h1>
        <p>Join the waitlist now!</p>
        <MetaMaskButton />
      </header>
    </div>
  );
}

export default App;
