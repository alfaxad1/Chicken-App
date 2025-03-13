import axios from "axios";
import React, { useEffect, useState } from "react";

const Sales = () => {
  let num = 1;
  const [salesData, setSalesData] = useState([]);

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
    try {
      const response = axios.delete(`http://localhost:3000/api/sales/${id}`);
      console.log(response.data.message);
      fetchSales();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price per unit</th>
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
