import React, { Component } from "react";
import SellerDataService from "../services/seller.service";
import { Link } from "react-router-dom";


export default class SellerList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSellerName = this.onChangeSearchSellerName.bind(this);
    this.retrieveSeller = this.retrieveSeller.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSeller = this.setActiveSeller.bind(this);
    this.removeAllSeller = this.removeAllSeller.bind(this);
    this.searchSellerName = this.searchSellerName.bind(this);

    this.state = {
      seller: [],
      currentSeller: null,
      currentIndex: -1,
      searchSellerName: ""
    };
  }

  componentDidMount() {
    this.retrieveSeller();
  }

  onChangeSearchSellerName(e) {
    const searchSellerName = e.target.value;

    this.setState({
      searchSellerName: searchSellerName
    });
  }

  retrieveSeller() {
    SellerDataService.getAll()
      .then(response => {
        this.setState({
          seller: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSeller();
    this.setState({
      currentSeller: null,
      currentIndex: -1
    });
  }

  setActiveSeller(seller, index) {
    this.setState({
      currentSeller: seller,
      currentIndex: index
    });
  }

  removeAllSeller() {
    SellerDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchSellerName() {
    SellerDataService.findBySellerName(this.state.searchSellerName)
      .then(response => {
        this.setState({
          seller: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchSellerName, seller, currentSeller, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Seller name"
              value={searchSellerName}
              onChange={this.onChangeSearchSellerName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchSellerName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Seller List</h4>

          <ul className="list-group">
            {seller &&
              seller.map((seller, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSeller(seller, index)}
                  key={index}
                >
                  {seller.SellerName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSeller}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentSeller ? (
            <div>
              <h4>Seller</h4>
              <div>
                <label>
                  <strong>Seller Name:</strong>
                </label>{" "}
                {currentSeller.SellerName}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentSeller.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentSeller.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/seller/" + currentSeller.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Seller...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}