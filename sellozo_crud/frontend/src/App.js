import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Link } from 'react-router-dom'
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import ProductList from "./components/product-list.component";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/product" className="navbar-brand">
            solloZo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/product"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path={["/", "/tutorials"]} element={<ProductList/>} />
            <Route exact path="/add" element={<AddProduct/>} />
            <Route path="/tutorials/:id" element={<Product/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;