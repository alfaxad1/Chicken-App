import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

import purchases from "./routes/purchases.js";
import sales from "./routes/sales.js";
import profit from "./routes/profit.js";
import expenses from "./routes/expenses.js";
import eggCollection from "./routes/eggCollection.js";
import chickenPurchases from "./routes/chickenPurchase.js";
import users from "./routes/users.js";
import chickenLoss from "./routes/chickenLoss.js";

app.use("/api/purchases", purchases);
app.use("/api/sales", sales);
app.use("/api/profits", profit);
app.use("/api/expenses", expenses);
app.use("/api/egg-collection", eggCollection);
app.use("/api/chicken-purchases", chickenPurchases);
app.use("/api/users", users);
app.use("/api/chicken-loss", chickenLoss);

const PORT = process.env.PORT;
const appName = process.env.APP_NAME;

app.listen(PORT, () => {
  console.log(`${appName} is running on port ${PORT}`);
});
