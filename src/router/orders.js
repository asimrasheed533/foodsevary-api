const express = require("express");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  address: String,
  products: Array,
  total: Number,
  status: String,
  cardNumber: String,
  cardName: String,
  cardDate: String,
  cardCvv: String,
});

const Order = mongoose.model("Order", schema);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const order = await Order.find();
    res.send(order);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send(order);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);
    await order.save();
    res.send(order);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAbdDelete(req.params.id);
    res.send(order);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
