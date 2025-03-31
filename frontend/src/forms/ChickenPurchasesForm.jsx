import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ChickenPurchasesForm = ({ fetchChickenPurchases }) => {
  const [chickenPurchase, setChickenPurchase] = useState({
    supplierId: "",
    chickenType: "",
    age: 0,
    price: 0,
    pieces: 0,
    discount: 0,
    date: "",
  });

  const [total, setTotal] = useState(0);

  const calculate = (pr, pi, dis) => {
    return parseFloat(pr) * parseFloat(pi) - parseFloat(dis);
  };

  useEffect(() => {
    setTotal(
      calculate(
        chickenPurchase.price,
        chickenPurchase.pieces,
        chickenPurchase.discount
      )
    );
  }, [chickenPurchase.price, chickenPurchase.pieces, chickenPurchase.discount]);

  chickenPurchase.total = total;

  const handleChange = (e) => {
    setChickenPurchase({ ...chickenPurchase, [e.target.name]: e.target.value });
  };

  const Save = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/chicken-purchases`,
        chickenPurchase
      );
      console.log(chickenPurchase);
      console.log(response.data.message);
      //window.location.reload();
      resetForm();
      fetchChickenPurchases();
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setChickenPurchase({
      supplierId: "",
      chickenType: "",
      age: 0,
      price: 0,
      pieces: 0,
      discount: 0,
      total: 0,
      date: "",
    });
  };

  return (
    <>
      <ToastContainer />

      <form id="chickenPurchases-form">
        <div id="chickenPurchases-fields">
          <div>
            <label htmlFor="supplier-id">Supplier ID: </label>
            <input
              type="text"
              name="supplierId"
              onChange={(e) => handleChange(e)}
              value={chickenPurchase.supplierId}
              placeholder="Enter supplier's name"
              required
            />
          </div>

          <div>
            <label htmlFor="type-of-chicken">Type of Chicken: </label>
            <select
              name="chickenType"
              onChange={(e) => handleChange(e)}
              value={chickenPurchase.chickenType}
              required
            >
              <option>Choose...</option>
              <option value="chick">Chick</option>
              <option value="hen">Hen</option>
              <option value="cockerel">Cockerel</option>
            </select>
          </div>

          <div>
            <label htmlFor="age">Age (weeks): </label>
            <input
              type="number"
              name="age"
              onChange={(e) => handleChange(e)}
              value={chickenPurchase.age}
              placeholder="Enter the age in weeks"
              required
            />
          </div>
          <div>
            <label htmlFor="price-per-piece">Price per piece: </label>
            <input
              type="number"
              name="price"
              onChange={(e) => handleChange(e)}
              value={chickenPurchase.price}
              placeholder="Enter price per piece"
              required
            />
          </div>

          <div>
            <label htmlFor="number-of-pieces">No. of pieces: </label>
            <input
              type="number"
              name="pieces"
              onChange={(e) => handleChange(e)}
              value={chickenPurchase.pieces}
              placeholder="Enter number of pieces"
              required
            />
          </div>
          <div>
            <label htmlFor="discount">Discount: </label>
            <input
              type="number"
              name="discount"
              onChange={(e) => handleChange(e)}
              value={chickenPurchase.discount}
              placeholder="Enter the discount given"
              required
            />
          </div>

          <div>
            <label htmlFor="total-price-chicken">Total:</label>
            <input
              type="number"
              name="total"
              placeholder="Total"
              value={total}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="purchase-date">Date:</label>
            <input
              type="date"
              name="date"
              onChange={(e) => handleChange(e)}
              value={chickenPurchase.date}
              required
            />
          </div>
          <button type="submit" onClick={(e) => Save(e)}>
            Save
          </button>
          {/* <button onclick="closeForm()">Close</button> */}
        </div>
      </form>
    </>
  );
};

export default ChickenPurchasesForm;
