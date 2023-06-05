const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", schema);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const Users = await User.find();
    res.send(Users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const User = await User.findById(req.params.id);
    res.send(User);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const User = await User.find({ email: req.body.email });
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Please fill all the fields" });
    }

    if (User) {
      const isMatch = await bcrypt.compare(password, User.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res
          .status(200)
          .json({ message: "User Signin Successfully", email: User.email });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const User = new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });
    await User.save();
    res.send(User);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const User = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });
    await User.save();
    res.send(User);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const User = await User.findByIdAndDelete(req.params.id);
    res.send(User);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
