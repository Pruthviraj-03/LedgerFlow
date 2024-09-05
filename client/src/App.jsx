import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Ledgers, Transaction } from "./pages/index";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ledgers" element={<Ledgers />} />
        <Route exact path="/transactions" element={<Transaction />} />
      </Routes>
    </div>
  );
};

export default App;
