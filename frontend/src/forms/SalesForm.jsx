import axios from "axios";
import React, { useState } from "react";

const SalesForm = ({ fetchSales }) => {
  const [saleType, setSaleType] = useState([]);

  const handleSaleTypeChange = (e) => {
    setSaleType(e.target.value);
  };

  const [sale, setSale] = useState({});

  const handleChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const Save = async () => {
    try {
      const response = await axios.post(``, sale);
      console.log(sale);
      console.log(response.data.message);
      fetchSales();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form id="sales-form">
        <div id="sale-fields">
          <label>Sale Type:</label>
          <select id="sale-type" onChange={(e) => handleSaleTypeChange(e)}>
            <option>Choose...</option>
            <option value="chicken">Chicken</option>
            <option value="eggs">Eggs</option>
          </select>
          {saleType === "chicken" ? (
            <div id="chicken-sale-fields">
              <div>
                <label>Customer ID:</label>
                <input
                  type="text"
                  id="customer-id-chicken"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Customer ID"
                />
              </div>
              <div>
                <label>Type of Chicken:</label>
                <select
                  id="type-of-chicken"
                  onChange={(e) => handleChange(e)}
                  s
                >
                  <option>Choose...</option>
                  <option value="chick">Chick</option>
                  <option value="hen">Hen</option>
                  <option value="cockerel">Cockerel</option>
                </select>
              </div>
              <div>
                <label htmlFor="price-per-piece">Price per Piece:</label>
                <input
                  type="number"
                  id="price-per-piece"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter price per piece"
                />
              </div>
              <div>
                <label htmlFor="number-of-pieces">Number of Pieces:</label>
                <input
                  type="number"
                  id="number-of-pieces"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter number of pieces"
                />
              </div>
              <div>
                <label htmlFor="total-price-chicken">Total:</label>
                <input
                  type="number"
                  id="total-price-chicken"
                  onChange={(e) => handleChange(e)}
                  placeholder="Total"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="chicken-sale-date">Date:</label>
                <input type="date" id="chicken-sale-date" />
              </div>
            </div>
          ) : saleType === "eggs" ? (
            <div id="eggs-sale-fields">
              <div>
                <label htmlFor="customer-id-eggs">Customer ID:</label>
                <input
                  type="text"
                  id="customer-id-eggs"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Customer ID"
                />
              </div>
              <div>
                <label htmlFor="quantity-trays">
                  Quantity Sold (trays/eggs):
                </label>
                <input
                  type="number"
                  id="quantity-trays"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label htmlFor="price-per-tray">Price per Unit:</label>
                <input
                  type="number"
                  id="price-per-tray"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter price per unit"
                />
              </div>
              <div>
                <label htmlFor="total-price-eggs">Total:</label>
                <input
                  type="number"
                  id="total-price-eggs"
                  onChange={(e) => handleChange(e)}
                  placeholder="Total"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="eggs-sale-date">Date:</label>
                <input
                  type="date"
                  id="eggs-sale-date"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <button type="submit" onClick={(e) => Save(e)}>
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default SalesForm;
