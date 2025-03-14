import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const SalesForm = ({ fetchSales }) => {
  const [saleType, setSaleType] = useState([]);
  const [total, setTotal] = useState(0);

  const [sale, setSale] = useState({
    customer_id: "",
    //saleType: "",
    chicken_type: "",
    price_per_piece: 0,
    number_of_pieces: 0,
    quantity_sold: 0,
    price_per_unit: 0,
    discount: 0,
    //total_price: 0,
    date: "",
  });

  const handleSaleTypeChange = (e) => {
    setSaleType(e.target.value);
  };

  sale.sale_type = saleType;
  sale.total_price = total;

  const handleChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const calculate = (val1, val2, dis) => {
    return parseFloat(val1) * parseFloat(val2) - parseFloat(dis);
  };

  useEffect(() => {
    saleType === "chicken"
      ? setTotal(
          calculate(sale.price_per_piece, sale.number_of_pieces, sale.discount)
        )
      : setTotal(
          calculate(sale.quantity_sold, sale.price_per_unit, sale.discount)
        );
  }, [
    sale.price_per_piece,
    sale.number_of_pieces,
    sale.quantity_sold,
    sale.price_per_unit,
    sale.discount,
    saleType,
  ]);

  const Save = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/sales`,
        sale
      );
      console.log(sale);
      console.log(response.data.message);
      window.location.reload();
      fetchSales();
      resetForm();
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setSale({
      customer_id: "",
      saleType: "",
      chicken_type: "",
      price_per_piece: 0,
      number_of_pieces: 0,
      quantity_sold: 0,
      price_per_unit: 0,
      discount: 0,
      total_price: 0,
      date: "",
    });
  };

  return (
    <>
      <ToastContainer />
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
                  name="customer_id"
                  value={sale.customer_id}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Customer ID"
                />
              </div>
              <div>
                <label>Type of Chicken:</label>
                <select
                  id="type-of-chicken"
                  onChange={(e) => handleChange(e)}
                  value={sale.chicken_type}
                  name="chicken_type"
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
                  name="price_per_piece"
                  value={sale.price_per_piece}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter price per piece"
                />
              </div>
              <div>
                <label htmlFor="number-of-pieces">Number of Pieces:</label>
                <input
                  type="number"
                  id="number-of-pieces"
                  name="number_of_pieces"
                  value={sale.number_of_pieces}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter number of pieces"
                />
              </div>
              <div>
                <label htmlFor="discount">Discount:</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={sale.discount}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter the discount given"
                />
              </div>
              <div>
                <label htmlFor="total-price-chicken">Total:</label>
                <input
                  type="number"
                  id="total-price-chicken"
                  name="total_price"
                  value={total}
                  onChange={(e) => handleChange(e)}
                  placeholder="Total"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="chicken-sale-date">Date:</label>
                <input
                  type="date"
                  id="chicken-sale-date"
                  name="date"
                  onChange={(e) => handleChange(e)}
                  value={sale.date}
                />
              </div>
            </div>
          ) : saleType === "eggs" ? (
            <div id="eggs-sale-fields">
              <div>
                <label htmlFor="customer-id-eggs">Customer ID:</label>
                <input
                  type="text"
                  id="customer-id-eggs"
                  name="customer_id"
                  value={sale.customer_id}
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
                  value={sale.quantity_sold}
                  name="quantity_sold"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label htmlFor="price-per-tray">Price per Unit:</label>
                <input
                  type="number"
                  id="price-per-tray"
                  name="price_per_unit"
                  value={sale.price_per_unit}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter price per unit"
                />
              </div>
              <div>
                <label htmlFor="discount">Discount:</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={sale.discount}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter the discount given"
                />
              </div>
              <div>
                <label htmlFor="total-price-eggs">Total:</label>
                <input
                  type="number"
                  id="total-price-eggs"
                  name="total_price"
                  value={total}
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
                  name="date"
                  value={sale.date}
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
