 import React,{Component} from "react";
 import { Link } from "react-router-dom";

 class Navbar extends Component {
    state={}

    render(){
        const {topBar,Footwear,cartItem,user,orders}=this.props
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
              My Store
            </Link>
            <div className="" id="navbarSupportedContent">
              <ul className="navbar-nav">
              {/* "Watches","Sunglasses","Belts","Handbags" */}
              {topBar.map((brand) => (
              <li className="nav-item" key={brand} style={{marginTop:"3px"}}>
                <Link className="navbar-brand" to={`/products?category=${brand}`}>
                  {brand}
                </Link>
              </li>
            ))}

<div className="dropdown text-white">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Footwear
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  {Footwear.map((n1) => (
                    <Link
                      key={n1}
                      className="dropdown-item"
                      to={`/products?category=${n1}`}
                    >
                      {n1}
                    </Link>
                  ))}
                </li>
              </ul>
            </div>




{ !user && (<li className="nav-item" style={{marginLeft:"370px",marginTop:"3px"}}>
    <Link className="navbar-brand"  to="/login">login</Link>
    </li>)}

    {user && (
      <div className="dropdown text-white" style={{marginLeft:"300px",marginTop:"3px"}}>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {user.email}
      </a>

      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li>
          {orders.map((n1) => (
            <Link
              key={n1}
              className="dropdown-item"
              to={`/${n1}`}
            >
              {n1}
            </Link>
          ))}
        </li>
      </ul>
    </div>

    )}

<li className="nav-item" style={{marginTop:"3px"}} >
<Link className="navbar-brand"  to="/cart">
    cart
        <span className="badge badge-pill badge-secondary "style={{backgroundColor:"green",text:"white"}}>{cartItem}</span>
        </Link>
</li>

              </ul>
            </div>
          </nav>
        )
    }
 }


 export default Navbar;