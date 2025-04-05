import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-x-10 gap-y-3 m-6">
        <Link to={`/purchases`}>
          <div className="border-black bg-red-500 rounded-lg shadow-xl text-indigo-800 font-bold text-center text-xl p-10 min-h-[100px]">
            Purchases
          </div>
        </Link>

        <Link to={`/sales`}>
          <div className="border-black bg-slate-500 rounded-lg shadow-xl text-indigo-800 font-bold text-center text-xl p-10 min-h-[100px]">
            Sales
          </div>
        </Link>

        <Link to={`/expenses`}>
          <div className="border-black bg-yellow-500 rounded-lg shadow-xl text-indigo-800 font-bold text-center text-xl p-10 min-h-[100px]">
            Expenses
          </div>
        </Link>

        <Link to={`/chicken-purchases`}>
          <div className="border-black bg-teal-500 rounded-lg shadow-xl text-indigo-800 font-bold text-center text-xl p-10 min-h-[100px]">
            Chicken purchases
          </div>
        </Link>

        <Link to={`/chicken-loss`}>
          <div className="border-black bg-purple-500 rounded-lg shadow-xl text-indigo-800 font-bold text-center text-xl p-10 min-h-[100px]">
            Loss
          </div>
        </Link>

        <Link to={`/eggs-collection`}>
          <div className="border-black bg-indigo-500 rounded-lg shadow-xl text-indigo-800 font-bold text-center text-xl p-10 min-h-[100px]">
            Eggs collection
          </div>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
