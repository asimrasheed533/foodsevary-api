const categories = require("./router/categories");
const content = require("./router/content");
const express = require("express");
const monogoose = require("mongoose");
const orders = require("./router/orders");
const products = require("./router/products");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

//api config
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(cors());

//DB config
monogoose.connect(process.env.MONGO_URL).then(() => {
  console.log("db connected");
});

//api endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Cooking API",
  });
});

app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/content", content);
app.use("/api/orders", orders);

//listen
app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}/`)
);
