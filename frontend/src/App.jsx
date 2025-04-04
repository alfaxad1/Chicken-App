import React from "react";
import Expenses from "./pages/Expenses";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Purchases from "./pages/Purchases";
import ChickenPurchases from "./pages/ChickenPurchases";
import ChickenLoss from "./pages/ChickenLoss";
import EggsCollection from "./pages/EggsCollection";
import Sales from "./pages/Sales";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./home/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/expenses" element={<Expenses />}></Route>
        <Route path="/purchases" element={<Purchases />}></Route>
        <Route path="/chicken-purchases" element={<ChickenPurchases />}></Route>
        <Route path="/chicken-loss" element={<ChickenLoss />}></Route>
        <Route path="/eggs-collection" element={<EggsCollection />}></Route>
        <Route path="/sales" element={<Sales />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
