import React,{Component} from "react";
import http from "../services/httpServices"
import {Link} from "react-router-dom"
class ManageProduct extends Component {
    state={
        products:[],
        searrchTerm:'',
    }

    async fecthData(){
     let response=await http.get("/products")
     console.log(response);
     let {data}=response;
     this.setState({products:data})
    }

    componentDidMount(){
        this.fecthData();
    }

    AddProduct=()=>{
        this.props.history.push("/addProducts")
    }
    handleChange=(e)=>{
        const { value } = e.target;
        this.setState({searrchTerm: value})
    }



    render(){
        const {products,searrchTerm}=this.state
        console.log(searrchTerm);

        let filter=products.filter((n)=>n.name.startsWith(searrchTerm));
        console.log(filter);

        return(
            <div className="container">
                <div style={{marginTop:"5px"}} ><button className="btn btn-success btn-sm" onClick={this.AddProduct}>Add a Product</button></div>
    <div className="row" style={{marginTop:"10px"}}>
        <div className="form-group">
            <input className="form-control" type="text" value={searrchTerm} placeholder="saerch...." onChange={this.handleChange}  />
        </div>
    </div>
                <div className="row bg-dark text-white " style={{marginTop:"20px"}}>
                    <div className="col-1 border">#</div>
                    <div className="col-3 border">Title</div>
                    <div className="col-3 border">Category</div>
                    <div className="col-2 border">Price</div>
                    <div className="col-3 border"></div>
                </div>
                {filter.map((n)=>(
                   <div className="row border">
                     <div className="col-1 border">{n.id}</div>
                    <div className="col-3 border">{n.name}</div>
                    <div className="col-3 border">{n.category}</div>
                    <div className="col-2 border">{n.price}</div>
                    <div className="col-3 border" style={{padding:"0 2px"}}>
                    <Link to={`/addProducts/${n.id}`}   >Edit</Link>
                    <Link  to={`/delete/${n.id}`} >Delete</Link>
                    </div>
                   </div> 
                ))}
            </div>
        )
    }
}

export default ManageProduct;