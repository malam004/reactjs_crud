import React, { Component } from "react";
import SellerDataService from "../services/seller.service";

export default class AddSeller extends Component {
  constructor(props) {
    super(props);
    this.onChangeSellerName = this.onChangeSellerName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveSeller = this.saveSeller.bind(this);
    this.newSeller = this.newSeller.bind(this);

    this.state = {
      id: null,
      sellerName: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeSellerName(e) {
    this.setState({
      sellerName: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveSeller() {
    var data = {
      sellerName: this.state.sellerName,
      description: this.state.description
    };

    SellerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          sellerName: response.data.sellerName,
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

  newSeller() {
    this.setState({
      id: null,
      sellerName: "",
      description: "",
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
              <button className="btn btn-success" onClick={this.newSeller}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="pName">Seller Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="sellerName"
                  required
                  value={this.state.sellerName}
                  onChange={this.onChangeSellerName}
                  name="sellerName"
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
  
              <button onClick={this.saveSeller} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}