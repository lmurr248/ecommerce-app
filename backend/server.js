const express = require("express");
const app = express();
const data = require("./data");
const cors = require("cors");

app.use(cors());

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x.id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
