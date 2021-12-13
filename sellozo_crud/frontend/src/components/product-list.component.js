import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";


export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchProductName = this.onChangeSearchProductName.bind(this);
    this.retrieveProduct = this.retrieveProduct.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.removeAllProduct = this.removeAllProduct.bind(this);
    this.searchProductName = this.searchProductName.bind(this);

    this.state = {
      product: [],
      currentproduct: null,
      currentIndex: -1,
      searchProductName: ""
    };
  }

  componentDidMount() {
    this.retrieveProduct();
  }

  onChangeSearchProductName(e) {
    const searchProductName = e.target.value;

    this.setState({
      searchProductName: searchProductName
    });
  }

  retrieveProduct() {
    ProductDataService.getAll()
      .then(response => {
        this.setState({
          product: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProduct();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }

  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index
    });
  }

  removeAllProduct() {
    ProductDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchProductName() {
    ProductDataService.findByProductName(this.state.searchProductName)
      .then(response => {
        this.setState({
          product: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchProductName, product, currentProduct, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Product name"
              value={searchProductName}
              onChange={this.onChangeSearchProductName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchProductName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Product List</h4>

          <ul className="list-group">
            {product &&
              product.map((product, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.ProductName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProduct}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <div>
              <h4>Product</h4>
              <div>
                <label>
                  <strong>Product Name:</strong>
                </label>{" "}
                {currentProduct.ProductName}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentProduct.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProduct.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/product/" + currentProduct.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}