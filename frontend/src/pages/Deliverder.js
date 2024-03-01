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

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      {orderData.map((tempdata, index) => (
        <div key={index} className="text-center mb-4">
          {tempdata.orderdata.map((temp2, idx) => (
            <div key={idx}>
              {temp2[0].status === "Delivared" ? (
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
                      {tempdata.email} - {temp2[0].status} -{" "}
                      {temp2[0].Order_date}
                    </button>
                  </h2>
                  <div
                    id={`orderCollapse${index}-${idx}`}
                    className={`accordion-collapse collapse ${
                      idx === 0 ? "show" : ""
                    }`}
                  >
                    <h4 className="mb-3">
                <span className="text-warning">Order_Id:</span>
                {temp2[0].Order_Id}
              </h4>
              <h4 className="mb-3">
                <span className="text-warning">TotalPrice:</span>₹
                {temp2[0].Total_price}
              </h4>
                    <div className="accordion-body d-flex gap-2 justify-content-center row">
                      {temp2.map(
                        (item, j) =>
                          // Exclude the 0th index item
                          j !== 0 && (
                            <div
                              className="card col-md-4 p-2"
                              key={j}
                              style={{
                                width: "300px",
                                height: "200px",
                                overflowY: "auto",
                              }}
                            >
                              <img
                                src={item.img}
                                className="card-img-top"
                                style={{ width: "300px", height: "200px" }}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <h6 className="card-text">
                                  Price: ₹{item.price}/- | Quantity:{" "}
                                  {item.qntity} | Size: {item.size}
                                </h6>
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
