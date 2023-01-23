import React,{Component} from "react";
import http from "../services/httpServices"
import auth from "../services/authService"
class Login extends Component{
    state={
        form:{email:"",password:""}
    }

    handleChange=(e)=>{
        let {currentTarget:Input}=e
        let s1={...this.state}
        s1.form[Input.name]=Input.value;
        this.setState(s1)
    }
    async postData(url,obj){
        try{
            let response=await http.post(url,obj);
          const {data}=response
          auth.login(data);
          console.log(response);
          window.location = "/checkout";
        }
        catch(ex){
            console.log(ex);
            if (ex.response && ex.response.status === 401) {
                let errors = {};
                errors.email = ex.response.data;
                this.setState({ errors: errors });
              }
        }
    }

    handleSumbit = (e) => {
        e.preventDefault();
    console.log(this.state.form);
        this.postData("/login", this.state.form);
      };


    render(){
        const {email,password}=this.state
        return(
            <div className="container">
                <div className="row" style={{marginTop:"20px"}}>
                    <div className="col-3"></div>
                <div className="col-6">
                    <div className="form-group">
                        <label  >Email Address</label>
                        <input type="text" className="form-control"  id="email" name="email" value={email} placeholder="Enter the email" onChange={this.handleChange}  />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password"  id="password" name="password" value={password} placeholder="enter the password"  onChange={this.handleChange} />
                    </div>
                    <div style={{marginTop:"5px"}} >
                    <button className="btn btn-primary btn-sm" onClick={this.handleSumbit} >Sumbit</button>
                </div>
                </div>

                </div>
            </div>
        )
    }
}


export default Login;