// userModel.js
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create users table if not exists
const createUserTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE
      )
    `);
    console.log("Users table created or already exists");
  } catch (error) {
    console.error("Error creating users table:", error);
  } finally {
    client.release();
  }
};

// Function to create a new user
const createUser = async (name, email, password, isAdmin = false) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `
      INSERT INTO users (name, email, password, is_admin)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, password, isAdmin]
    );
    return rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Throw error to handle in routes
  } finally {
    client.release();
  }
};

// Function to create an admin user
const createAdminUser = async (name, email, password) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `
      INSERT INTO users (name, email, password, is_admin)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, password, true]
    ); // isAdmin set to true for admin user
    return rows[0];
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error; // Throw error to handle in routes
  } finally {
    client.release();
  }
};

// Function to get all users
const getUsers = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Throw error to handle in routes
  } finally {
    client.release();
  }
};

module.exports = {
  createUserTable,
  createUser,
  createAdminUser,
  getUsers,
  pool,
};
