// Card2.js
import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./Contexred";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("regular");
  const priceRef = useRef();
  const [TotalPrice, setTotalPrice] = useState(
    qty * parseInt(props.allitem.regular)
  );
  const [showToast, setShowToast] = useState(false);
  const [showToastUpdated, setShowToastUpdated] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/delete/${props.allitem._id}`
      );
      console.log(response.data);

      // if (!response.ok) {
      //   alert("Error Occur");
      //   throw new Error(`HTTP error! Status: ${response.status}`);

      // }
      if (response.data.success) {
        alert("Deleted Sucessfully");
        navigate("/adminaddfood");
      }
      // You can handle success, show a toast, or navigate to another page here
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  useEffect(() => {
    setSize(priceRef.current.value);
    setTotalPrice(qty * parseInt(props.allitem[size]));
  }, [qty, size, props.allitem]);

  return (
    <div
      className="card m-2 border border-warning p-1 position-relative"
      style={{ width: "22rem", maxHeight: "500px", overflowY: "auto" }}
    >
      <img
        src={props.allitem.img}
        className="card-img-top rounded"
        alt="..."
        style={{ borderRadius: "10px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.allitem.name}</h5>
        <p className="card-text">{props.allitem.description}</p>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-warning"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="m-2 h-100 bg-warning"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="regular">Regular</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <div className="d-inline h-100 fs-5">₹{TotalPrice}</div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Card;
