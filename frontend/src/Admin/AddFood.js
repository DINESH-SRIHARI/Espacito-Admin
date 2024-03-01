import React, { useState } from "react";
import { Link } from "react-router-dom";
import backadd from "../statics/additem.jpg";
import { useNavigate } from "react-router-dom";
import "../css/addfood.css";
export default function AddFood() {
  const [credentials, setCredentials] = useState({
    categoryName: "",
    name: "",
    imageURL: "",
    regular: "",
    medium: "",
    large: "",
    description: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/addfood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: credentials.categoryName,
          name: credentials.name,
          imageURL: credentials.imageURL,
          regular: credentials.regular,
          medium: credentials.medium,
          large: credentials.large,
          description: credentials.description,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        alert("Added Sucessfully");
        navigate("/");
      }

      // Handle the response as needed
      // For example, you can check response.json() if it's a JSON response
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="addfood">
      <div
        className="row container"
        style={{
          backgroundImage: `url(${backadd})`,
          backdropFilter: "blur(1000px)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          backgroundColor: "#FFBB00",
          "@media (max-width: 430px)": {
            margin: "0", // Adjusted margin value for screens 430 pixels or below
          },
          "@media (min-width: 431px)": {
            margin: "0 0 0 130px", // Default margin value for screens larger than 430 pixels
          },
        }}
      >
        <div className="col-md-8 justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="d-flex">
              <div className="m-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-dark fw-bold"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="categoryName"
                  value={credentials.categoryName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="m-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-dark fw-bold"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  className="form-control text-success"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="m-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-dark fw-bold"
              >
                ImageURL
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="imageURL"
                value={credentials.imageURL}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex">
              <div className="m-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-dark fw-bold"
                >
                  Regular Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="regular"
                  value={credentials.regular}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="m-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-dark fw-bold"
                >
                  Medium Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="medium"
                  value={credentials.medium}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="m-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-dark fw-bold"
                >
                  large Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="large"
                  value={credentials.large}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="m-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-dark fw-bold"
              >
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="description"
                value={credentials.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
