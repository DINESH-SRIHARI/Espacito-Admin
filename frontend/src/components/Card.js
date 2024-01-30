import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./Contexred";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("regular");
  const priceRef = useRef();
  const [TotalPrice, setTotalPrice] = useState(
    qty * parseInt(props.allitem.regular)
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleModalShow = () => setShowDeleteModal(true);
  const handleModalClose = () => setShowDeleteModal(false);

  const handleDelete = async () => {
    handleModalClose(); // Close the modal before processing deletion

    try {
      const response = await axios.delete(
        `https://espacito-admin.onrender.com/delete/${props.allitem._id}`
      );

      if (response.data.success) {
        alert("Deleted Successfully");
        navigate("/adminaddfood");
      }
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

        {localStorage.getItem("authToken") ? (
          <div className="d-flex">
            <Link
              to={`/update/${props.allitem._id}`}
              className="btn bg-success"
            >
              Update Details
            </Link>
            <button className="btn bg-danger mx-2" onClick={handleModalShow}>
              Delete Item
            </button>
          </div>
        ) : (
          ""
        )}

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Card;
