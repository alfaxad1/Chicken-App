import axios from "axios";
import React, { useEffect, useState } from "react";

const Expenses = () => {
  let num = 1;
  const [expensesData, setExpensesData] = useState([]);

  const [expense, setExpense] = useState({
    type: "",
    cost: 0,
    date: "",
  });
  //const [show, setShow] = useState([]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: [e.target.value] });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/expenses");
      console.log(response.data);
      setExpensesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Delete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/expenses/${id}`
      );
      console.log(response.data.message);
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const Save = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/expenses`,
        expense
      );
      console.log(response.data.message);
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button>Create</button>
      <div>
        <form id="expenses-form">
          <div id="expenses-fields">
            <div>
              <label htmlFor="expense-type">Type of Expense:</label>
              <input
                type="text"
                name="type"
                onChange={(e) => handleChange(e)}
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
                required
              />
            </div>
            <button onClick={(e) => Save(e)} name="submit" type="submit">
              Save
            </button>
            {/* <button>Close</button> */}
          </div>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Type</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expensesData.map((expense) => (
            <tr key={expense.id}>
              <td>{num++}</td>
              <td>{expense.Type}</td>
              <td>{expense.Price}</td>
              <td>{expense.Date}</td>
              <td>
                <button onClick={() => Delete(expense.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Expenses;
