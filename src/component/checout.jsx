import React, { Component } from "react";
import http from "../services/httpServices"
class Checkout extends Component {
  state = {
    form: { name: "", address: "", city: "" },
  };

  handleChange=(e)=>{
    let {currentTarget:Input}=e;
    let s1={...this.state}
    s1.form[Input.name]=Input.value;
    this.setState(s1);
  }

  async postData(url, obj) {
    try {
      let response = await http.post(url, obj);
      const { id } = this.props.match.params;
      console.log(response);
      this.props.history.push(`/thanks`);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errors = {};
        errors.id = ex.response.data;
        this.setState({ errors: errors });
      }
    }
  }

  handleSumbit=(e)=>{
    e.preventDefault();
    let {form}=this.state
    let user={name:form.name,address:form.address,city:form.city,amount:this.props.account,items:this.props.cartItem}
console.log(user);
this.postData("/orders",user) 

}


  render() {
    const { cartData, cartItem, account } = this.props;
    const { name, address, city } = this.state;
    return (
      <div className="container">
        <div className="row border">
          <h5 className="text-center">Summary Your Order</h5>
              <h6 className="text-center">Your order have {cartItem} items </h6>
          <div className="row bg-dark text-center text-white">
            <div className="col-4">Name</div>
            <div className="col-4">Quantity</div>
            <div className="col-4">Amount</div>
          </div>
          {cartData.map((n) => (
            <div className="row border">
              <div className="col-4">{n.name}</div>
              <div className="col-4">{n.Quantity}</div>
              <div className="col-4">{n.Amount}</div>
            </div>
          ))}
          <div className="row">
            <div className="col-4">Total</div>
            <div className="col-4"></div>
            <div className="col-4">{account}</div>
          </div>
        </div>
 
        <div className="row"  style={{marginTop:"30px"}} >
        <h4 className="text-center">  Delivery Details</h4>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={city}
              onChange={this.handleChange}
            />
          </div>
          <div style={{marginTop:"10px"}} >
            <button className="btn btn-primary btn-sm" onClick={this.handleSumbit}>Sumbit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
