import React, { Component } from "react";

export default class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelete: false,
    };

    this.handleCardSelection = (p, index) => {
      this.setState({ isDelete: !this.state.isDelete });
      this.props.cardDataHandler(p);
    };
  }
  render() {
    const { p, index } = this.props;
    const Description = p.description.substring(0, 20) + "...";
    return (
      <div className="col-4 border border-top-2" style={{ marginTop: "20px" }}>
        <img
          src={p.imgLink}
          style={{ width: "100%", marginTop: "10px", height: "35vh" }}
          alt=""
        />
        <h5>{p.name}</h5>
        <span>RS.{p.price}</span>
        <br />
        <span>{Description}</span>
        <div className="row">
          {this.state.isDelete ? (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => this.handleCardSelection(p, index)}
            >
              Delete To cart
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => this.handleCardSelection(p, index)}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    );
  }
}
