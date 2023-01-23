import React,{Component} from "react";

import http from "../services/httpServices"
class Delete extends Component{
    state={}

    async componentDidMount() {
        let { id } = this.props.match.params;
        let response = await http.deleteApi(`/products/${id}`);
        console.log("product=", response);
        this.props.history.push("/products");
      }

    render(){
        return("")
    }
}

export default Delete;