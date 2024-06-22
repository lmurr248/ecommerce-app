const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const { pool } = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Requested Product ID:", productId);
    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);
    const product = rows[0];
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found." });
    }
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send({ message: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    res.send(rows);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
