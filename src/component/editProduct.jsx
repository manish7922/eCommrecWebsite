import React,{Component} from "react";
import http from "../services/httpServices"
class EditProduct extends Component{
    state={
        form:{name:"",description:"",price:"",imgLink:"",category:""},
        categoryData:["Watches","Sunglasses","Belts","Handbags","Formal Shoes","Sport Shoes","Floaters","Sandels"]
    }

    componentDidMount() {
        this.fetchData();
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
      }
      async fetchData() {
        const { id } = this.props.match.params;
        console.log(id);
      
          let response = await http.get(`/products/${id}`);
          console.log("person=", response);
          let { data } = response;
          this.setState({ form: data });
      }
      handleChange = (e) => {
        const { currentTarget: input } = e;
        console.log(e);
        let s1 = { ...this.state };
        s1.form[input.name] = input.value;
        this.setState(s1);
      };

      async putData(url, obj) {
        let response = await http.putData(url, obj);
        console.log(response);
     
      }
      deleteProduct = (id) => {
        this.props.history.push(`/delete/${id}`);
      };
    
      handleSumbit = (e) => {
        e.preventDefault();
        const { form } = this.state;
        console.log(form);
       this.putData(`/products/${form.id}`, form)
       
      };


    render(){
        const {name,description,price,imgLink,category}=this.state.form;
        const {categoryData}=this.state;
        const { id } = this.props.match.params;
        return(
            <div className="container " style={{marginTop:"20px"}}>
                  <h3 className="text-center">Edit Products</h3>
                <div className="row">
                    <div className="col-6">
                       <div className="row bg-dark" style={{width:"100%",height:"60vh"}}>
                       <img src={imgLink} style={{width:"100%",marginTop:"10px",height:"35vh"}} /> 
                       <h4 className="text-white">{name}</h4><br />
                       <h5  className="text-white">category:{category}</h5><br />
                       <h5  className="text-white">Price:{price}</h5>
                       </div>
                    </div>
                    <div className="col-6">
                      

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
    <div className="form-group" style={{marginTop:"2px"}}>
        <label>Category</label>
        <select className="form-control" name="category" value={category} >
            {categoryData.map((n)=>(
                <option>{n}</option>
            ))}
        </select>
    </div>
    <div style={{marginTop:"4px"}} >
        <button className="btn btn-primary btn-sm" onClick={this.handleSumbit}>save</button>  
        <button className="btn btn-secondary btn-sm" style={{marginLeft:"3px"}}   onClick={() => this.deleteProduct(id)}>delete</button>
    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProduct;