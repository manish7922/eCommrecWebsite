import React,{Component} from "react";
import http from "../services/httpServices"

class AddProduct extends Component{
    state={
        form:{name:"",description:"",price:"",imgLink:"",category:""},
        categoryData:["Watches","Sunglasses","Belts","Handbags","Formal Shoes","Sport Shoes","Floaters","Sandels"]
    }

    handleChange=(e)=>{
        let {currentTarget:input}=e
        let s1={...this.state}
        s1.form[input.name]=input.value;
        this.setState(s1)
    }
    async postData(url,obj){
        try {
            let response = await http.post(url, obj);
            const { id } = this.props.match.params;
            console.log(response);
            this.props.history.push(`/manageProducts`);
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

        this.postData("/products",this.state.form);
    }

    render(){
        const {name,description,price,imgLink,category}=this.state.form;
        const {categoryData}=this.state;
        return(
<div className="container">
    <div className="form-gruop" style={{marginTop:"2px"}}>
        <label >Name</label>
        <input type="text" className="form-control" id="name" name="name" value={name} placeholder="name"  onChange={this.handleChange} />
    </div>
    <div className="form-gruop" style={{marginTop:"2px"}}>
        <label >Description</label>
        <input type="text" className="form-control" id="description" name="description" value={description} placeholder="description..."  onChange={this.handleChange} />
    </div>
    <div className="form-gruop" style={{marginTop:"2px"}}>
        <label >Price</label>
        <input type="text" className="form-control" id="price" name="price" value={price} placeholder="price"  onChange={this.handleChange} />
    </div>
    <div className="form-gruop" style={{marginTop:"2px"}}>
        <label >Image</label>
        <input type="text" className="form-control" id="imgLink" name="imgLink" value={imgLink} placeholder="imgLink"  onChange={this.handleChange} />
    </div>
   

    <div className='form-group' style={{marginTop:"2px"}}>
        <label>Category</label>
        <select className='form-control' name="category" value={category} onChange={this.handleChange}>
            <option disabled value="">Select your Category</option>
            {categoryData.map((c1)=>(
                <option>{c1}</option>
            ))}
        </select>
    </div>
    <div style={{marginTop:"4px"}} >
        <button className="btn btn-primary btn-sm" onClick={this.handleSumbit}>Sumbit</button>
    </div>
</div>
        )
    }
}

export default AddProduct;