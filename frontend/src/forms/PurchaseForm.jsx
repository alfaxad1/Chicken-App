import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPurchases } from "./PurchaseForm";

const PurchaseForm = () => {
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState({
    product: "",
    bags: 0,
    qty: 0,
    cost_per_bag: 0,
    discount: 0,
    total: 0,
    date: "",
  });

  const handleChange = (e) => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  };
  const Save = async (e) => {
    e.preventDefault();
    try {
      console.log(purchase);
      const response = await axios.post(
        `http://localhost:3000/api/purchases`,
        purchase
      );
      console.log(response.data.message);
      fetchPurchases();
      navigate(`/purchases`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form id="purchase-form">
        <div id="purchase-fields">
          <div>
            <label htmlFor="product">Product:</label>
            <select
              name="product"
              onChange={(e) => {
                handleChange(e);
              }}
              required
            >
              <option>Choose...</option>
              <option value="Chick mash">Chick mash</option>
              <option value="Growers mash">Growers mash</option>
              <option value="Kienyeji mash">Kienyeji mash</option>
              <option value="Layers mash">Layers mash</option>
            </select>
          </div>
          <div>
            <label htmlFor="bags">Number of bags:</label>
            <input
              type="number"
              name="bags"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Enter number of bags"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity (Kg):</label>
            <input
              type="number"
              name="qty"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Enter quantity"
              required
            />
          </div>
          <div>
            <label htmlFor="cost">Cost Per Bag:</label>
            <input
              type="number"
              name="cost_per_bag"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Enter cost"
              required
            />
          </div>
          <div>
            <label htmlFor="discount">Discount:</label>
            <input
              type="number"
              name="discount"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Enter discount given"
              required
            />
          </div>
          <div>
            <label htmlFor="total">Total cost:</label>
            <input
              type="number"
              name="total"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder=""
              required
            />
          </div>
          <div>
            <label htmlFor="purchase-date">Date:</label>
            <input
              type="date"
              name="date"
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
          </div>
          <button
            type="submit"
            name="submit"
            onClick={(e) => {
              Save(e);
            }}
          >
            Save
          </button>
          {/* <button onclick="closeForm()">Close</button> */}
        </div>
      </form>
    </>
  );
};

export default PurchaseForm;
