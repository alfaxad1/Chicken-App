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
      <form id="expenses-form" className="">
        <div id="expenses-fields">
          <div className="">
            <label className="">Type of Expense:</label>
            <input
              className=""
              type="text"
              name="type"
              onChange={(e) => handleChange(e)}
              value={expense.type}
              placeholder="Enter expense type"
              required
            />
          </div>
          <div>
            <label className="">Cost:</label>
            <input
              className=""
              type="number"
              name="cost"
              onChange={(e) => handleChange(e)}
              value={expense.cost}
              placeholder="Enter cost"
              required
            />
          </div>
          <div>
            <label className="">Date:</label>
            <input
              className=""
              type="date"
              name="date"
              onChange={(e) => handleChange(e)}
              value={expense.date}
              required
            />
          </div>
          <button
            className="bg-blue-500 rounded-lg m-4 px-3 py-1 text-gray-700 "
            onClick={(e) => Save(e)}
            name="submit"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ExpensesForm;
