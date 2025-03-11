import React from "react";
import Expenses from "./pages/Expenses";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Purchases from "./pages/Purchases";
import ChickenPurchases from "./pages/ChickenPurchases";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/expenses" element={<Expenses />}></Route>
        <Route path="/purchases" element={<Purchases />}></Route>
        <Route path="/chicken-purchases" element={<ChickenPurchases />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
