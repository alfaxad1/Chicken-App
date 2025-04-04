import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      This is the Dashboard
      <Link to={`/purchases`}> Purchases</Link>
      <Link to={`/sales`}> Sales</Link>
      <Link to={`/expenses`}> Expenses</Link>
      <Link to={`/chicken-purchases`}> Chicken Purchases</Link>
      <Link to={`/chicken-loss`}> Loss</Link>
      <Link to={`/eggs-collection`}> Egg collection</Link>
    </div>
  );
};

export default Dashboard;
