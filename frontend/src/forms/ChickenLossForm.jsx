import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ChickenLossForm = ({ fetchChickenLoss }) => {
  const [chickenLoss, setChickenLoss] = useState({
    chickenType: "",
    cause: "",
    number: 0,
    date: "",
  });

  const handleChange = (e) => {
    setChickenLoss({ ...chickenLoss, [e.target.name]: e.target.value });
  };

  const Save = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/chicken-loss`,
        chickenLoss
      );
      console.log(chickenLoss);
      console.log(response.data.message);
      fetchChickenLoss();
      //window.location.reload();
      resetForm();
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setChickenLoss({
      chickenType: "",
      cause: "",
      number: 0,
      date: "",
    });
  };

  return (
    <>
      <ToastContainer />
      <form id="chickenLoss-form">
        <div>
          <label htmlFor="chicken-type">Chicken Type</label>
          <select
            id="chicken-type"
            name="chickenType"
            onChange={(e) => handleChange(e)}
            value={chickenLoss.chickenType}
            required
          >
            <option>choose...</option>
            <option value="chick">chick</option>
            <option value="hen">hen</option>
            <option value="cockerel">cockerel</option>
          </select>
        </div>
        <div>
          <label htmlFor="cause">Cause: </label>
          <input
            type="text"
            id="cause"
            name="cause"
            onChange={(e) => handleChange(e)}
            value={chickenLoss.cause}
            placeholder="Cause of loss"
          />
        </div>
        <div>
          <label htmlFor="number">Number of chicken: </label>
          <input
            type="text"
            id="number"
            name="number"
            onChange={(e) => handleChange(e)}
            value={chickenLoss.number}
            required
            placeholder="Number"
          />
        </div>
        <div>
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={(e) => handleChange(e)}
            value={chickenLoss.date}
            required
            placeholder="Date"
          />
        </div>
        <button type="submit" onClick={(e) => Save(e)}>
          Save
        </button>
      </form>
    </>
  );
};

export default ChickenLossForm;
