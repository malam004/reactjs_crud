import React, { Component } from "react";
import ProductDataService from "../services/product.service";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      productName: "",
      description: "", 
      productPrice: 0.0,
      published: false,

      submitted: false
    };
  }

  onChangeProductName(e) {
    this.setState({
      productName: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveProduct() {
    var data = {
      productName: this.state.productName,
      description: this.state.description
    };

    ProductDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          productName: response.data.productName,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      productName: "",
      description: "",
      productPrice: 0.0,
      published: false,

      submitted: false
    });
  }
  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newProduct}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="pName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  required
                  value={this.state.productName}
                  onChange={this.onChangeProductName}
                  name="productName"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
  
              <button onClick={this.saveProduct} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}