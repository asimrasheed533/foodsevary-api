const express = require("express");
const mongoose = require("mongoose");
const uploadImage = require("../uploadImage");

const schema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  img: String,
  stock: Number,
  category: String,
  description: String,
  isFeatured: Boolean,
  isActive: Boolean,
});

const Product = mongoose.model("Product", schema);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const imagePath = uploadImage(req.body.img, req.body.name);
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      img: imagePath,
      stock: req.body.stock,
      category: req.body.category,
      description: req.body.description,
      isFeatured: req.body.isFeatured,
      isActive: req.body.isActive,
    });
    await product.save();
    res.send(product);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const imagePath = uploadImage(req.body.img, req.body.name);
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      img: imagePath,
      stock: req.body.stock,
      category: req.body.category,
      description: req.body.description,
      isFeatured: req.body.isFeatured,
      isActive: req.body.isActive,
    });
    await product.save();
    res.send(product);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send(product);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
