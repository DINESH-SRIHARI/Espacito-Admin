import React, { useState, useEffect } from "react";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchMyOrder = async () => {
      try {
        const response = await fetch(
          "https://espacito-admin.onrender.com/myorderedData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: localStorage.getItem("userEmail"),
            }),
          }
        );

        const data = await response.json();
        setOrderData(data.Orderdata);
      } catch (error) {
        console.error("Error fetching my order:", error);
      }
    };

    fetchMyOrder();
  }, []);
  const handleDropdownChange = async (newStatus, id, idx) => {
    try {
      const response = await fetch(
        "https://espacito-admin.onrender.com/updateOrderStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: id,
            itemIdx: idx,
            newStatus: newStatus,
          }),
        }
      );

      if (response.ok) {
        // If the request is successful, update the orderData state
        const updatedOrderData = [...orderData];
        updatedOrderData[id].orderdata[idx][0].status = newStatus;
        setOrderData(updatedOrderData);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      {orderData.map((tempdata, index) => (
        <div key={index} className="text-center mb-4">
          {tempdata.orderdata.map((temp2, idx) => (
            <div key={idx}>
              {temp2[0].status === "Preparing" ? (
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        idx !== 0 ? "collapsed" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#orderCollapse${index}-${idx}`}
                      aria-expanded={idx === 0 ? "true" : "false"}
                      aria-controls={`orderCollapse${index}-${idx}`}
                    >
                      <div className="d-flex justify-content-around">
                        <div>
                          {tempdata.email} - {temp2[0].Order_date}
                        </div>
                        <div>
                          {temp2[0].status === "Out For Delivary" ? "🚵" : ""}
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`orderCollapse${index}-${idx}`}
                    className={`accordion-collapse collapse ${
                      idx === 0 ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body d-flex gap-2 justify-content-center row">
                      <div className="dropdown ms-auto">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id={`dropdownMenuButton${index}-${idx}`}
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {temp2[0].status}
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby={`dropdownMenuButton${index}-${idx}`}
                        >
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              handleDropdownChange(
                                "Out For Delivery",
                                tempdata._id,
                                index
                              )
                            }
                          >
                            Out For Delivery
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              handleDropdownChange(
                                "Delivared",
                                tempdata._id,
                                idx
                              )
                            }
                          >
                            Delivered
                          </a>
                        </div>
                      </div>
                      {temp2.map(
                        (item, j) =>
                          // Exclude the 0th index item
                          j !== 0 && (
                            <div
                              className="card col-md-4 p-2"
                              key={j}
                              style={{
                                width: "330px",
                                height: "200px",
                                overflowY: "auto",
                                overflowX: "hidden",
                              }}
                            >
                              <img
                                src={item.img}
                                className="card-img-top"
                                style={{
                                  width: "300px",
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                                alt="Item Image"
                              />
                              <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <h6 className="card-text">
                                  Price: ₹{item.price}/- | Quantity:{" "}
                                  {item.qntity} | Size: {item.size}
                                </h6>
                                <button className="btn btn-success">
                                  <input type="checkbox" />
                                </button>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
