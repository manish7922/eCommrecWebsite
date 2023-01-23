import React, { Component } from "react";
import http from "../services/httpServices";
import {Link} from "react-router-dom"
import queryString from "query-string";
class MainFile extends Component {
  state = {
    product: [],
    buttonData:["All","Watches","Sunglasses","Belts","Handbags","Formal Shoes","Sport Shoes","Floaters","Sandels"],
    data:"",
 Index:-1,
  };

  async fetchData() {
    const queryParams = queryString.parse(this.props.location.search);
    let searchString = this.makeSearchString(queryParams);
    let url=searchString ? `/baseUrl/products?${searchString}`:"/products";
    try {
      let response=await http.get(url)
      let {data}=response;
      console.log(data);
      this.setState({product:data,errMsg:null});
  
  } catch (ex) {
      console.log(ex.response);
      let errMsg=`${ex.response.status} ${ex.response.statusText}`
      this.setState({orders:[],errMsg:errMsg});  
  }

    }

    handleClick=(br)=>{
let s1={...this.state}
 s1.data=br;
console.log(s1.data);
this.setState(s1)
    }
  
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }

  handleCart=(index)=>{
    // console.log(data);
    let s1={...this.state}
let myProduct=s1.product[index]
    console.log(myProduct);
    // this.props.cartData.push(myProduct)

s1.Index = this.props.cartData.find((n) => n.id === myProduct.id);
console.log(s1.Index);
let X1=s1.Index;
if(X1){
  X1.Quantity=X1.Quantity+1
  X1.Amount=X1.price*X1.Quantity 
  // return  X1
}else{
  let  Quantity=1;
let  Amount=myProduct.price*Quantity;
let json1={id:myProduct.id,category:myProduct.category,description:myProduct.description,Quantity:Quantity,Amount:Amount,imgLink:myProduct.imgLink,name:myProduct.name,price:myProduct.price}
this.props.cartData.push(json1)
console.log(this.props.cartData);
}

    this.setState(s1)

  }

  onDelete=(name)=>{
    let s1={...this.state}
    let Index=this.props.cartData.findIndex((n)=>n.name===name);
    console.log(Index);
    this.props.cartData.splice(Index,1);
    console.log(this.props.cartData);
    this.setState(s1)
  }

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

const {product,buttonData,data,Index}=this.state
const {cartData}=this.props

    return(
       <div className="container">
      <div className="row">
        <div className="col-3" style={{marginTop:"10px"}}>
      <div className="row border" style={{width:"80%"}}>
  
      {buttonData.map((br)=><button className='btn  btn-sm m-2 ' onClick={()=>{this.handleClick(br)}}>{br}</button>)}
      </div>
        </div>
        <div className="col-9">
        <div className="row ">
          {product.map((p,index)=>{
             const Description = p.description.substring(0, 20) + "..."
        return(
              <div className="col-4 border border-top-2" style={{marginTop:"20px"}}>
                     
              <img src={p.imgLink} style={{width:"100%",marginTop:"10px",height:"35vh"}} /> 
              <h5>{p.name}</h5>
              <span>RS.{p.price}</span><br />
              <span>{Description}</span>
              <div className="row">
              { !Index  ? (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => this.onDelete(p.id)}
                      >
                        Delete To cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => this.handleCart(index)}
                      >
                        Add To Cart
                      </button>
                    )}
         
             </div>
              </div>
        )
          
  })}
            </div>
        </div>
      </div>
    </div>
    )
  }
}


export default MainFile;
