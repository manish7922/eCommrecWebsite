import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./navbar";
import MainFile from "./mainFile";
import Cart from "./cart";
import Login from "./login";
import auth from "../services/authService";
import Logout from "./logout";
import Checkout from "./checout";
import Thank from "./thankYou";
import MyOrders from "./myOrders";
import ManageProduct from "./manageProduct";
import AddProduct from "./addProduct";
import Delete from "./delete";
import EditProduct from "./editProduct";
class MainComponent extends Component {
  state = {
    topBar: ["Watches", "Sunglasses", "Belts", "Handbags"],
    Footwear: ["Formal Shoes", "Sport Shoes", "Floaters", "Sandels"],
    cartData: [],
    orders: ["myOrders", "manageOrders", "logout"],
    checkData: [],
  };

  handleAdd = (index) => {
    let s1 = { ...this.state };
    let myProduct = s1.cartData[index];
    let Quantity = myProduct.Quantity + 1;
    let Amount = Quantity * myProduct.price;
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
    s1.cartData[index] = json1;
    this.setState(s1);
  };

  handleMinus = (index) => {
    let s1 = { ...this.state };
    let myProduct = s1.cartData[index];
    let Quantity = myProduct.Quantity - 1;
    let Amount = Quantity * myProduct.price;
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
    s1.cartData[index] = json1;
    this.setState(s1);
  };

  cardDataHandler = (data) => {
    const res = {
      ...data,
      Quantity: 1,
      Amount: data.price,
    };
    this.setState((prev) => ({
      ...prev,
      cartData: [...this.state.cartData, res],
    }));
  };

  render() {
    const { topBar, Footwear, cartData, orders } = this.state;

    let cartItem = cartData.reduce(function (a, c) {
      return c.Quantity + a;
    }, 0);
    let account = cartData.reduce(function (a, c) {
      return c.Amount + a;
    }, 0);
    console.log(this.state.cartData);
    let user = auth.getUser();
    return (
      <div className="container">
        <Navbar
          topBar={topBar}
          Footwear={Footwear}
          cartItem={cartItem}
          user={user}
          orders={orders}
        />
        <Switch>
          <Route
            path="/addProducts/:id"
            render={(props) => <EditProduct {...props} />}
          />
          <Route path="/delete/:id" render={(props) => <Delete {...props} />} />
          <Route
            path="/addProducts"
            render={(props) => <AddProduct {...props} />}
          />
          <Route path="/manageOrders" component={ManageProduct} />
          <Route path="/myOrders" component={MyOrders} />
          <Route
            path="/checkout"
            render={(props) =>
              user ? (
                <Checkout
                  {...props}
                  cartData={cartData}
                  cartItem={cartItem}
                  account={account}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route
            path="/products"
            render={(props) => (
              <MainFile
                {...props}
                handleCart={this.handleCartData}
                cartData={cartData}
                cardDataHandler={this.cardDataHandler}
              />
            )}
          />
          <Route
            path="/cart"
            render={(props) => (
              <Cart
                {...props}
                cartData={cartData}
                cartItem={cartItem}
                account={account}
                onhandle={this.handleAdd}
                onhandleMinus={this.handleMinus}
              />
            )}
          />
          <Route path="/thanks" component={Thank} />

          <Redirect form="/" to="/products" />
        </Switch>
      </div>
    );
  }
}

export default MainComponent;
