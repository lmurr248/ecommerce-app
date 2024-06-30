import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import axios from "axios";
import { useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";

axios.defaults.baseURL = "http://localhost:5000";

const App = () => {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin || {};

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">E-Commerce App</Link>
          </div>
          <div className="header-links">
            <div className="welcome-text">
              {userInfo ? (
                <Link to="/profile">Hi, {userInfo.name.match(/^\S+/)[0]}</Link>
              ) : (
                <Link to="/signin">
                  <button className="sign-in">Sign In</button>
                </Link>
              )}
            </div>
            <Link to="/cart">
              <button className="cart">Cart</button>
            </Link>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <Link to="/">Trousers</Link>
            </li>
            <li>
              <Link to="/">Shirts</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/signin/" element={<SigninScreen />} />
              <Route path="/register/" element={<RegisterScreen />} />
              <Route path="/product/:_id" element={<ProductScreen />} />
              <Route path="/cart/:_id?" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
