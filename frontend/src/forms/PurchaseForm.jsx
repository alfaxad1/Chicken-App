import axios from "axios";
import React, { useEffect, useState } from "react";

const PurchaseForm = ({ fetchPurchases }) => {
  const [product, setProduct] = useState("");
  const [bags, setBags] = useState(0);
  const [qty, setQty] = useState(50);
  const [cost_per_bag, setCostPerBag] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState("");

  const purchase = {
    product,
    bags,
    qty,
    cost_per_bag,
    discount,
    total,
    date,
  };

  const resetForm = () => {
    setProduct("");
    setBags(0);
    setQty(50);
    setCostPerBag(0);
    setDiscount(0);
    setTotal(0);
    setDate("");
  };

  useEffect(() => {
    setTotal(calculateTotal(bags, cost_per_bag, discount));
  }, [bags, cost_per_bag, discount]);

  const calculateTotal = (bags, cost, discount) => {
    return parseFloat(bags) * parseFloat(cost) - parseFloat(discount);
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
      resetForm();
      fetchPurchases();
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
                setProduct(e.target.value);
              }}
              value={product}
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
                setBags(e.target.value);
              }}
              placeholder="Enter number of bags"
              value={bags}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity (Kg):</label>
            <input
              type="number"
              name="qty"
              onChange={(e) => {
                setQty(e.target.value);
              }}
              value={qty}
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label htmlFor="cost">Cost Per Bag:</label>
            <input
              type="number"
              name="cost_per_bag"
              onChange={(e) => {
                setCostPerBag(e.target.value);
              }}
              placeholder="Enter cost"
              value={cost_per_bag}
              required
            />
          </div>
          <div>
            <label htmlFor="discount">Discount:</label>
            <input
              type="number"
              name="discount"
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              value={discount}
              placeholder="Enter discount given"
              required
            />
          </div>
          <div>
            <label htmlFor="total">Total cost:</label>
            <input
              type="number"
              name="total"
              readOnly
              value={total}
              placeholder="Total"
              required
            />
          </div>
          <div>
            <label htmlFor="purchase-date">Date:</label>
            <input
              type="date"
              name="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
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
