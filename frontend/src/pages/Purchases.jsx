import { useEffect, useState } from "react";
import PurchaseForm from "../forms/PurchaseForm";
import axios from "axios";

const Purchases = () => {
  let num = 1;

  const [purchasesData, setPurchasesData] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/purchases`);
      setPurchasesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const Delete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/purchases/${id}`
      );
      console.log(response.data.message);
      fetchPurchases();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PurchaseForm fetchPurchases={fetchPurchases} />
      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Product</th>
            <th>Bags</th>
            <th>Quantity(Kg)</th>
            <th>Cost per bag</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchasesData.map((purchase) => (
            <tr key={purchase.id}>
              <td>{num++}</td>
              <td>{purchase.product_name}</td>
              <td>{purchase.no_of_bags}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.cost_per_bag}</td>
              <td>{purchase.discount}</td>
              <td>{purchase.total_cost}</td>
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

export default Purchases;
