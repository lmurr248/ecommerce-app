import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

class App extends Component {
  render() {
    const openMenu = () => {
      document.querySelector(".sidebar").classList.add("open");
    };

    const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
    };

    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="header">
            <div className="brand">
              <button onClick={openMenu}>&#9776;</button>
              <Link to="/">E-Commerce</Link>
            </div>
            <div className="header-links">
              <a href="/cart">Cart</a>
              <a href="/signin">Sign In</a>
            </div>
          </header>
          <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>
              x
            </button>
            <ul>
              <li>
                <a href="/">Trousers</a>
              </li>
              <li>
                <a href="/">Shirts</a>
              </li>
            </ul>
          </aside>
          <main className="main">
            <div className="content">
              <Routes>
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/" element={<HomeScreen />} />
              </Routes>
            </div>
          </main>
          <footer className="footer">All rights reserved.</footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
