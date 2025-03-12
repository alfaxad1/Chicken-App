import axios from "axios";
import React, { useEffect, useState } from "react";
import EggsCollectionForm from "../forms/EggsCollectionForm";

const EggsCollection = () => {
  let num = 1;
  const [eggsCollectionData, setEggsCollectionData] = useState([]);

  useEffect(() => {
    fetchEggsCollection();
  }, []);

  const fetchEggsCollection = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/egg-collection`
      );
      console.log(response.data);
      setEggsCollectionData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Delete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/egg-collection/${id}`
      );
      console.log(response.data.message);
      fetchEggsCollection();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <EggsCollectionForm fetchEggsCollection={fetchEggsCollection} />
      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Date</th>
            <th>Eggs Collected</th>
            <th>Damaged eggs</th>
            <th>Goog eggs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {eggsCollectionData.map((collection) => (
            <tr key={collection.id}>
              <td>{num++}</td>
              <td>{collection.collection_date}</td>
              <td>{collection.eggs_collected}</td>
              <td>{collection.damaged_eggs}</td>
              <td>{collection.eggs_collected - collection.damaged_eggs}</td>
              <td>
                <button onClick={() => Delete(collection.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EggsCollection;
