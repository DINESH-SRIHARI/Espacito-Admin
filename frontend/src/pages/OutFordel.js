import React, { useState, useEffect } from "react";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchMyOrder = async () => {
      try {
        const response = await fetch("http://localhost:5000/myorderedData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"),
          }),
        });

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
      const response = await fetch("http://localhost:5000/updateOrderStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: id,
          itemIdx: idx,
          newStatus: newStatus,
        }),
      });

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
              {temp2[0].status === "Out For Delivery" ? (
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
                          {tempdata.email} - {temp2[0].Order_date} -{temp2[0].Geolocation}
                        </div>
                        <div>
                          {temp2[0].status === "Out For Delivery" ? (
                            <div className="d-flex gap-3 ">
                              <a className="mx-2 text-warning"  href={`https://www.google.com/maps?q=${temp2[0].Geolocation}`} target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
</svg></a>
                              <a className="text-warning"  href={`tel:${temp2[0].number}`}>
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="26"
                                  height="26"
                                  fill="currentColor"
                                  class="bi bi-telephone"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg>
                              </a>
                            </div>
                          ) : (
                            ""
                          )}
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
                      <h4 className="mb-3">
                <span className="text-warning">Order_Id:</span>
                {temp2[0].Order_Id}
              </h4>
              <h4 className="mb-3">
                <span className="text-warning">TotalPrice:</span>₹
                {temp2[0].Total_price}
              </h4>
                      {temp2.map(
                        (item, j) =>
                          // Exclude the 0th index item
                          j !== 0 && (
                            <div
                              className="card col-md-4 p-2"
                              key={j}
                              style={{
                                width: "330px",
                                height: "170px",
                                overflowY: "auto",
                                overflowX: "hidden",
                              }}
                            >
                              
                              <div className="card-body">
                                <h5 className="card-title text-warning">{item.name}</h5>
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
