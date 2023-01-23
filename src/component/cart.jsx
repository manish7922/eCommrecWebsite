import React,{Component} from "react";
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

class Cart extends Component {
    state={}

    handleCheckOut = () => {
        this.props.history.push(`/checkout`);
      };

    render(){
        const {cartData,cartItem,account,onhandle,onhandleMinus}=this.props
        return(
            <div className="container">
                <h5 className="text-center"> you have {cartItem} Items in your cart</h5>
               <p>Cart Value:Rs.{account}.00</p>
             <div className="" style={{alighItems:"right"}}>
                <button className="btn btn-primary btn-sm" onClick={this.handleCheckOut} >CheckOut</button>
                </div>  
<div className="row bg-dark text-white border ">
    <div className="col-2"></div>
    <div className="col-6">Production details</div>
    <div className="col-2">Quantity</div>
    <div className="col-2">Price</div>
</div>
          {cartData.map((c,index)=>(
            <div className="row border" style={{marginTop:"10px",height:"20vh"}}>
                <div className="col-2" style={{marginTop:"7px"}}>  <img src={c.imgLink} style={{width:"90%"}} /> </div>
           <div className="col-6">
            {c.name}<br />
            {c.category}<br />
            {c.description}
           </div>
           <div className="col-2">
            <button className="btn btn-success btn-sm" onClick={()=>onhandle(index)}><FaPlus /></button>
            <button className="btn btn-sm"> {c.Quantity}</button> 
            <button className="btn btn-warning btn-sm" onClick={()=>onhandleMinus(index)}><FaMinus /></button>
           </div>
           <div className="col-2">Rs.{c.Amount}</div>
            </div>
          ))}

            </div>
        )
    }
}


export default Cart;