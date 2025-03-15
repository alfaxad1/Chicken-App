import axios from "axios";
import React, { useEffect, useState } from "react";
import SalesForm from "../forms/SalesForm";
import { toast, ToastContainer } from "react-toastify";

const Sales = () => {
  let num = 1;
  const [salesData, setSalesData] = useState([]);
  const [show, setShow] = useState(false);

  const create = () => {
    setShow(!show);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/sales`);
      setSalesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Delete = async (id) => {
    const confirmed = confirm("Do you want to delete this sale?");
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/sales/${id}`
        );

        console.log(response.data.message);
        fetchSales();
        toast.success(response.data.message);
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
        <SalesForm fetchSales={fetchSales} />
      </div>

      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price per unit</th>
            <th>Discount</th>
            <th>Total price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{num++}</td>
              <td>{sale.date.split("T")[0]}</td>
              <td>{sale.customer_id}</td>
              <td>{sale.sale_type}</td>
              <td>{sale.number_of_pieces || sale.quantity_sold}</td>
              <td>{sale.price_per_piece || sale.price_per_unit}</td>
              <td>{sale.discount}</td>
              <td>{sale.total_price}</td>
              <td>
                <button onClick={() => Delete(sale.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sales;
