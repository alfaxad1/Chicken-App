import axios from "axios";
import React, { useState } from "react";

const EggsCollectionForm = ({ fetchEggsCollection }) => {
  const [collection, setCollection] = useState({
    collection_date: "",
    eggs_collected: 0,
    damaged_eggs: 0,
  });

  const handleChange = (e) => {
    setCollection({ ...collection, [e.target.name]: e.target.value });
  };

  const Save = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/egg-collection`,
        collection
      );
      //console.log(collection);
      console.log(response.data.message);
      resetForm();
      fetchEggsCollection();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setCollection({
      collection_date: "",
      eggs_collected: 0,
      damaged_eggs: 0,
    });
  };

  return (
    <>
      <form id="egg-collection-form">
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="collection_date"
            value={collection.collection_date}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Number of Eggs:</label>
          <input
            type="number"
            name="eggs_collected"
            onChange={(e) => handleChange(e)}
            value={collection.eggs_collected}
            required
            placeholder="Enter number of eggs"
          />
        </div>
        <div>
          <label>Damaged Eggs:</label>
          <input
            type="number"
            name="damaged_eggs"
            onChange={(e) => handleChange(e)}
            value={collection.damaged_eggs}
            required
            placeholder="Enter damaged eggs"
          />
        </div>
        <button type="submit" onClick={(e) => Save(e)}>
          Save
        </button>
      </form>
    </>
  );
};

export default EggsCollectionForm;
