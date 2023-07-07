const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Please fill all the fields" });
    }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res
          .status(200)
          .json({ message: "User Signin Successfully", email: user.email });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });
    await updatedUser.save();
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(deletedUser);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
