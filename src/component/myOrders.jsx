import React,{Component} from "react";
import http from "../services/httpServices"
class MyOrders extends Component{
    state={
        orders:[]
    }

    async fecthData(){
let response =await http.get("/orders")
let {data}=response
console.log(response);
this.setState({orders:data})
    }
    componentDidMount(){
        this.fecthData();
    }

    render(){
        const {orders}=this.state
        return(
            <div className="container" >
                <div className="row bg-dark text-center text-white" style={{marginTop:"15px"}}>
                    <div className="col-2 border">Name</div>
                    <div className="col-2 border">City</div>
                    <div className="col-3 border">Address</div>
                    <div className="col-2 border">items</div> 
                      <div className="col-3 border">Amount</div>
                </div>
              {orders.map((n)=>(
                <div className="row border">
                    <div className="col-2 border">{n.name}</div>
                    <div className="col-2 border">{n.city}</div>
                    <div className="col-3 border">{n.address}</div>
                    <div className="col-2 border">{n.items}</div>
                    <div className="col-3 border">{n.amount}</div>
                   
                </div>
              ))}
            </div>
        )
    }
}

export default MyOrders
