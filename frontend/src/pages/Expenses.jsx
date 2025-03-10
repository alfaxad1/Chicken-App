import axios from "axios";
import React, { useEffect, useState } from "react";
import ExpensesForm from "../forms/ExpensesForm";

const Expenses = () => {
  let num = 1;
  const [expensesData, setExpensesData] = useState([]);

  //const [show, setShow] = useState([]);

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

  return (
    <>
      <ExpensesForm fetchExpenses={fetchExpenses} />

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
