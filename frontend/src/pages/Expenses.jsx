import axios from "axios";
import React, { useEffect, useState } from "react";
import ExpensesForm from "../forms/ExpensesForm";
import { toast, ToastContainer } from "react-toastify";

const Expenses = () => {
  let num = 1;
  const [expensesData, setExpensesData] = useState([]);

  const [show, setShow] = useState(false);

  const create = () => {
    setShow(!show);
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

  const toastProperties = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };

  const Delete = async (id) => {
    const confirmed = confirm("Do you want to delete this expense?");
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/expenses/${id}`
        );
        console.log(response.data.message);
        fetchExpenses();
        toast.success(response.data.message, toastProperties);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <button onClick={() => create()}>create</button>
      <div style={{ display: show ? "block" : "none" }}>
        <ExpensesForm fetchExpenses={fetchExpenses} />
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
