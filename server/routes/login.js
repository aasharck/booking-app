const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt")

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "User does not Exist!" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }
    
    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
