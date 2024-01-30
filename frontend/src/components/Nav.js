import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Modal from "../Modal";
import { useCart } from "./Contexred";
export default function Nav() {
  const [cartview,setcartview]=useState(false)
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken")
    navigate("/login")
  }
  let data=useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Esposito</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
<Link className="nav-link active"  aria-current="page" to="/adminaddfood">AddNewItem</Link>
      </li>:""}
      {(localStorage.getItem("authToken"))?
        <li className="nav-item">
<Link className="nav-link active"  aria-current="page" to="/Change">Prices</Link>
      </li>:""}
      {(localStorage.getItem("authToken"))?
        <li className="nav-item">
<Link className="nav-link active"  aria-current="page" to="/adminaddcat">AddNewCategory</Link>
      </li>:""}
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/orders">Orders</Link>
      </li>:""}
      {(localStorage.getItem("authToken"))?
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/outfordel">OutForDelivary</Link>
      </li>:""}
      {(localStorage.getItem("authToken"))?
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/delivaredallorders">DelivardOrders</Link>
      </li>:""}
      {(localStorage.getItem("authToken"))?
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/createuser">AddNewAdmin</Link>
      </li>:""}
      </ul>
      {(localStorage.getItem("authToken"))?
      <div>
        <div className="btn bg-dark text-danger mx-1" onClick={handleLogout}>Logout</div>
        </div>
      : <div className="d-flex">
      <Link className="btn bg-dark text-success mx-1" to="/login">login</Link>
    </div>}
    
    </div>
  </div>
</nav>

    </div>
  )
}
