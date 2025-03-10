import axios from "axios";
import React, { useState } from "react";

const ExpensesForm = ({ fetchExpenses }) => {
  const [expense, setExpense] = useState({
    type: "",
    cost: 0,
    date: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: [e.target.value] });
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
      <form id="expenses-form">
        <div id="expenses-fields">
          <div>
            <label htmlFor="expense-type">Type of Expense:</label>
            <input
              type="text"
              name="type"
              onChange={(e) => handleChange(e)}
              value={expense.type}
              placeholder="Enter expense type"
              required
            />
          </div>
          <div>
            <label htmlFor="expense-cost">Cost:</label>
            <input
              type="number"
              name="cost"
              onChange={(e) => handleChange(e)}
              value={expense.cost}
              placeholder="Enter cost"
              required
            />
          </div>
          <div>
            <label htmlFor="expense-date">Date:</label>
            <input
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
