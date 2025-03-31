import axios from "axios";
import React, { useEffect, useState } from "react";
import ChickenPurchasesForm from "../forms/ChickenPurchasesForm";
import { toast, ToastContainer } from "react-toastify";

const ChickenPurchases = () => {
  let num = 1;
  const [chickenPurchasesData, setChickenPurchasesData] = useState([]);
  const [show, setShow] = useState(false);

  const create = () => {
    setShow(!show);
  };

  useEffect(() => {
    fetchChickenPurchases();
  }, []);

  const fetchChickenPurchases = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/chicken-purchases`
      );
      console.log(response.data);
      setChickenPurchasesData(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const Delete = async (id) => {
    const confirmed = confirm("Do you want to delete this purchase?");
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/chicken-purchases/${id}`
        );
        console.log(response.data.message);
        fetchChickenPurchases();
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
        <ChickenPurchasesForm fetchChickenPurchases={fetchChickenPurchases} />
      </div>

      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Supplier</th>
            <th>Chicken Type</th>
            <th>Age</th>
            <th>Price per piece</th>
            <th>Pieces</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {chickenPurchasesData.map((purchase) => (
            <tr key={purchase.id}>
              <td>{num++}</td>
              <td>{purchase.supplier_id}</td>
              <td>{purchase.chicken_type}</td>
              <td>{purchase.age}</td>
              <td>{purchase.price_per_piece}</td>
              <td>{purchase.no_of_pieces}</td>
              <td>{purchase.discount}</td>
              <td>{purchase.total_price}</td>
              <td>{purchase.purchase_date}</td>
              <td>
                <button onClick={() => Delete(purchase.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ChickenPurchases;
