import axios from "axios";
import React, { useEffect, useState } from "react";
import ChickenLossForm from "../forms/ChickenLossForm";
import { toast, ToastContainer } from "react-toastify";

const ChickenLoss = () => {
  const [chickenLossData, setChickenLossData] = useState([]);
  const [show, setShow] = useState(false);

  const create = () => {
    setShow(!show);
  };

  let num = 1;
  useEffect(() => {
    fetchChickenLoss();
  }, []);

  const fetchChickenLoss = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/chicken-loss`
      );
      setChickenLossData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Delete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/chicken-loss/${id}`
      );
      console.log(response.data.message);
      fetchChickenLoss();
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ToastContainer />

      <button onClick={() => create()}>create</button>
      <div style={{ display: show ? "block" : "none" }}>
        <ChickenLossForm fetchChickenLoss={fetchChickenLoss} />
      </div>
      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Chicken Type</th>
            <th>Cause</th>
            <th>Number</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chickenLossData.map((loss) => (
            <tr key={loss.id}>
              <td>{num++}</td>
              <td>{loss.chicken_type}</td>
              <td>{loss.cause}</td>
              <td>{loss.number}</td>
              <td>{loss.date}</td>
              <td>
                <button onClick={() => Delete(loss.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ChickenLoss;
