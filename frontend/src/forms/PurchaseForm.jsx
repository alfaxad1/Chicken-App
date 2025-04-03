import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const PurchaseForm = ({ fetchPurchases }) => {
  const [purchase, setPurchase] = useState({
    product: "",
    bags: 0,
    qty: 50,
    cost_per_bag: 0,
    discount: 0,
    date: "",
  });
  const [total, setTotal] = useState(0);

  const handleChange = (e) => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setTotal(
      calculateTotal(purchase.bags, purchase.cost_per_bag, purchase.discount)
    );
  }, [purchase.bags, purchase.cost_per_bag, purchase.discount]);

  const calculateTotal = (bags, cost, discount) => {
    return parseFloat(bags) * parseFloat(cost) - parseFloat(discount);
  };
  purchase.total = total;

  const resetForm = () => {
    setPurchase({
      product: "",
      bags: 0,
      qty: 50,
      cost_per_bag: 0,
      discount: 0,
      total: 0,
      date: "",
    });
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
      //window.location.reload();
      fetchPurchases();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <form id="purchase-form">
        <div id="purchase-fields">
          <div>
            <label htmlFor="product">Product:</label>
            <select
              name="product"
              onChange={(e) => handleChange(e)}
              value={purchase.product}
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
              onChange={(e) => handleChange(e)}
              placeholder="Enter number of bags"
              value={purchase.bags}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity (Kg):</label>
            <input
              type="number"
              name="qty"
              onChange={(e) => handleChange(e)}
              value={purchase.qty}
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label htmlFor="cost">Cost Per Bag:</label>
            <input
              type="number"
              name="cost_per_bag"
              onChange={(e) => handleChange(e)}
              placeholder="Enter cost"
              value={purchase.cost_per_bag}
              required
            />
          </div>
          <div>
            <label htmlFor="discount">Discount:</label>
            <input
              type="number"
              name="discount"
              onChange={(e) => handleChange(e)}
              value={purchase.discount}
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
              onChange={(e) => handleChange(e)}
              value={purchase.date}
              required
            />
          </div>
          <button
            type="submit"
            name="submit"
            className=""
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
