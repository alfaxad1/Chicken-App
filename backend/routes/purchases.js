import express from "express";
import connection from "../config/dbConnection.js";
//import authenticateToken from "../middlewares/auth.js";

const router = express.Router();
router.use(express.json());

//get purchases
router.get("/", (req, res) => {
  const query = "SELECT * FROM purchases";
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
});

// Save purchases to the database
router.post("/", (req, res) => {
  const { product, bags, qty, cost_per_bag, discount, total, date } = req.body;
  const query =
    "INSERT INTO purchases (product_name, no_of_bags, quantity, cost_per_bag, discount, total_cost, purchase_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [product, bags, qty, cost_per_bag, discount, total, date],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ message: "Purchase Saved Successfully" });
    }
  );
});

// Update purchases in the database
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { product, bags, qty, cost_per_bag, discount, total, date } = req.body;

  const query =
    "UPDATE purchases SET product_name = ?, no_of_bags = ?, quantity = ?, cost_per_bag = ?, discount = ?, total_cost = ?, purchase_date = ? WHERE id = ?";

  connection.query(
    query,
    [product, bags, qty, cost_per_bag, discount, total, date, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      return res.status(200).json({ message: "Purchase Updated Successfully" });
    }
  );
});

// Delete purchases from the database
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM purchases WHERE id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: "Purchase Deleted Successfully" });
  });
});

export default router;
