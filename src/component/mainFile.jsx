import React, { Component } from "react";
import http from "../services/httpServices";
import { Link } from "react-router-dom";
import Card from "./card";
class MainFile extends Component {
  state = {
    product: [],
    buttonData: [
      "All",
      "Watches",
      "Sunglasses",
      "Belts",
      "Handbags",
      "Formal Shoes",
      "Sport Shoes",
      "Floaters",
      "Sandels",
    ],
    data: "",
    Index: -1,
  };

  async fetchData() {
    const searchItem = window.location.href.split("/")[3];

    let url = searchItem.includes("?") ? `/baseUrl/${searchItem}` : "/products";

    try {
      let response = await http.get(url);
      let { data } = response;
      this.setState({ product: data, errMsg: null });
    } catch (ex) {
      console.log(ex.response);
      let errMsg = `${ex.response.status} ${ex.response.statusText}`;
      this.setState({ orders: [], errMsg: errMsg });
    }
  }

  handleClick = (br) => {
    let s1 = { ...this.state };
    s1.data = br;
    this.setState({ product: this.state.product });
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }

  handleCart = (index) => {
    let s1 = { ...this.state };
    let myProduct = s1.product[index];
    console.log(myProduct);
    s1.Index = this.props.cartData.find((n) => n.id === myProduct.id);
    let X1 = s1.Index;
    if (X1) {
      X1.Quantity = X1.Quantity + 1;
      X1.Amount = X1.price * X1.Quantity;
      // return  X1
    } else {
      let Quantity = 1;
      let Amount = myProduct.price * Quantity;
      let json1 = {
        id: myProduct.id,
        category: myProduct.category,
        description: myProduct.description,
        Quantity: Quantity,
        Amount: Amount,
        imgLink: myProduct.imgLink,
        name: myProduct.name,
        price: myProduct.price,
      };

      let json2 = {
        ...myProduct,
        Quantity: Quantity,
        Amount: Amount,
      };

      this.props.cartData.push(json1);
    }
    this.setState(s1);
  };

  onDelete = (name) => {
    let s1 = { ...this.state };
    let Index = this.props.cartData.findIndex((n) => n.name === name);
    console.log(Index);
    this.props.cartData.splice(Index, 1);
    console.log(this.props.cartData);
    this.setState(s1);
  };

  makeSearchString = (options) => {
    let { category } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "category", category);

    return searchStr;
  };
  addToQueryString = (str, parmaName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${parmaName}=${paramValue}`
        : `${parmaName}=${paramValue}`
      : str;

  render() {
    const { product, buttonData } = this.state;
    const { cartData, cardDataHandler } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-3" style={{ marginTop: "10px" }}>
            <div className="row border" style={{ width: "80%" }}>
              {buttonData.map((br) => (
                <Link to={`/products?category=${br}`}>
                  <button
                    className="btn  btn-sm m-2 "
                    onClick={() => {
                      this.handleClick(br);
                    }}
                  >
                    {br}
                  </button>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-9">
            <div className="row ">
              {product?.map((p, index) => {
                return (
                  <Card
                    p={p}
                    cartData={cartData}
                    onDelete={this.onDelete}
                    cardDataHandler={cardDataHandler}
                    handleCart={this.handleCart}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainFile;
