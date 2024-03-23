import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { useCart } from "./Contexred";

export default function Nav() {
  const [cartview, setCartView] = useState(false);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const isAdmin = authToken ? true : false;
  const { addFood, addCat, orders, outForDel, deliveredOrders, createUser } = routes;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const renderAdminLinks = () => {
    if (isAdmin) {
      return (
        <>
          <NavItem to={addFood}>Add New Item</NavItem>
          <NavItem to={addCat}>Add New Category</NavItem>
          <NavItem to={orders}>Orders</NavItem>
          <NavItem to={outForDel}>Out For Delivery</NavItem>
          <NavItem to={deliveredOrders}>Delivered Orders</NavItem>
          <NavItem to={createUser}>Add New Admin</NavItem>
        </>
      );
    }
  };

  const renderAuthButton = () => {
    if (isAdmin) {
      return <div className="btn bg-dark text-danger mx-1" onClick={handleLogout}>Logout</div>;
    } else {
      return <Link className="btn bg-dark text-success mx-1" to="/login">Login</Link>;
    }
  };

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
              {renderAdminLinks()}
            </ul>
            {renderAuthButton()}
          </div>
        </div>
      </nav>
    </div>
  );
}

// Reusable NavItem component
const NavItem = ({ to, children }) => (
  <li className="nav-item">
    <Link className="nav-link active" to={to}>{children}</Link>
  </li>
);

// Define routes
const routes = {
  addFood: "/adminaddfood",
  addCat: "/adminaddcat",
  orders: "/orders",
  outForDel: "/outfordel",
  deliveredOrders: "/delivaredallorders",
  createUser: "/createuser"
};
