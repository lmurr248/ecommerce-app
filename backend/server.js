const express = require("express");
const app = express();
const data = require("./data");
const cors = require("cors");

app.use(cors());

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
