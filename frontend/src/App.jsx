import React from "react";
import Expenses from "./pages/Expenses";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/expenses" element={<Expenses />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
