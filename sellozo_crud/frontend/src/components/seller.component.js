import React, { Component } from "react";
import SellerDataService from "../services/seller.service";

export default class Seller extends Component {
  constructor(props) {
    super(props);
    this.onChangeSellerName = this.onChangeSellerName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getSeller = this.getSeller.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSeller = this.updateSeller.bind(this);
    this.deleteSeller = this.deleteSeller.bind(this);

    this.state = {
      currentSeller: {
        id: null,
        sellerName: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSeller(this.props.match.params.id);
  }

  onChangeSellerName(e) {
    const sellerName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSeller: {
          ...prevState.currentSeller,
          sellerName: sellerName
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentSeller: {
        ...prevState.currentSeller,
        description: description
      }
    }));
  }

  getSeller(id) {
    SellerDataService.get(id)
      .then(response => {
        this.setState({
          currentSeller: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSeller.id,
      sellerName: this.state.currentSeller.sellerName,
      description: this.state.currentSeller.description,
      published: status
    };

    SellerDataService.update(this.state.currentSeller.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSeller: {
            ...prevState.currentSeller,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSeller() {
    SellerDataService.update(
      this.state.currentSeller.id,
      this.state.currentSeller
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Seller was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSeller() {    
    SellerDataService.delete(this.state.currentSeller.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Sellers')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSeller } = this.state;

    return (
      <div>
        {currentSeller ? (
          <div className="edit-form">
            <h4>Seller</h4>
            <form>
              <div className="form-group">
                <label htmlFor="sellerName">Seller Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="sellerName"
                  value={currentSeller.sellerName}
                  onChange={this.onChangeSellerName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentSeller.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentSeller.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentSeller.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSeller}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSeller}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Seller...</p>
          </div>
        )}
      </div>
    );
  }
}