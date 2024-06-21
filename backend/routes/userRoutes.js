const express = require("express");
const router = express.Router();
const { pool, createAdminUser, createUser } = require("../models/userModel");

router.get("/createadmin", async (req, res) => {
  try {
    const user = {
      name: "Laurence",
      email: "laurence@gmail.com",
      password: "1234",
      isAdmin: true,
    };
    const result = await createAdminUser(user.name, user.email, user.password);
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await createUser(name, email, password);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
