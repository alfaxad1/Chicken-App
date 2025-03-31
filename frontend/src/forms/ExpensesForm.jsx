import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ExpensesForm = ({ fetchExpenses }) => {
  const [expense, setExpense] = useState({
    type: "",
    cost: 0,
    date: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const Save = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/expenses`,
        expense
      );
      console.log(response.data.message);
      resetForm();
      fetchExpenses();
      //window.location.reload();
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setExpense({
      type: "",
      cost: 0,
      date: "",
    });
  };

  return (
    <>
      <ToastContainer />
      <form id="expenses-form">
        <div id="expenses-fields">
          <div>
            <label className="block text-sm font-medium">
              Type of Expense:
            </label>
            <input
              className="w-auto border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              type="text"
              name="type"
              onChange={(e) => handleChange(e)}
              value={expense.type}
              placeholder="Enter expense type"
              required
            />
          </div>
          <div>
            <label className="block">Cost:</label>
            <input
              className="w-auto border-gray-300 rounded-lg shadow-sm"
              type="number"
              name="cost"
              onChange={(e) => handleChange(e)}
              value={expense.cost}
              placeholder="Enter cost"
              required
            />
          </div>
          <div>
            <label className="block">Date:</label>
            <input
              className="w-auto border-gray-300 rounded-lg shadow-sm"
              type="date"
              name="date"
              onChange={(e) => handleChange(e)}
              value={expense.date}
              required
            />
          </div>
          <button onClick={(e) => Save(e)} name="submit" type="submit">
            Save
          </button>
          {/* <button>Close</button> */}
        </div>
      </form>
    </>
  );
};

export default ExpensesForm;
