const express = require("express");
const router = express.Router();
const {
  findUserByEmailAndPassword,
  createAdminUser,
  createUser,
} = require("../models/userModel");
const { getToken } = require("../util");

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmailAndPassword(email, password);
    if (user) {
      res.send({
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
        token: getToken(user),
      });
    } else {
      res.status(401).send({ message: "Invalid Email or Password." });
    }
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).send({ message: "An error occurred during signin." });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password);
    if (user) {
      res.status(201).send({
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
        token: getToken(user),
      });
    } else {
      res.status(400).send({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send({ message: err.message });
  }
});

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

module.exports = router;
