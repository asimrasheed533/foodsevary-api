const express = require("express");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  banner: Array,
  address: String,
  phone: String,
  email: String,
  map: String,
});

const Content = mongoose.model("Content", schema);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const content = await Content.find();
    res.send(content);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    res.send(content);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.send(content);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body);
    await content.save();
    res.send(content);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    res.send(content);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
