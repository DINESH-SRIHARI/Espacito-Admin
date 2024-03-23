import React, { useEffect, useState } from "react";
import axios from "axios";
import Card2 from "../components/Card";
export default function Carousal() {
  const [data, setData] = useState({ foodData: [], categoryData: [] });

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://espacito-admin.onrender.com/getalldata"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const [search, setSearch] = useState();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search == "") {
      try {
        const response = await axios.post(
          `https://espacito-admin.onrender.com/getalldata`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        const response = await fetch(
          `https://espacito-admin.onrender.com/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Item: search,
            }),
          }
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }
    }
  };
  return (
    <div>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: 10 }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button className="btn btn-warning" onClick={handleSearch}>
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/2600x900/?Cuisine"
              className="d-block w-100"
              alt="..."
              style={{
                maxWidth: "100%",
                height: "auto",
                "@media (max-width: 430px)": { maxHeight: "300px" },
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/2600x900/?Gourmet"
              className="d-block w-100"
              alt="..."
              style={{
                maxWidth: "100%",
                height: "auto",
                "@media (max-width: 430px)": { maxHeight: "300px" },
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/2600x900/?food"
              className="d-block w-100"
              alt="..."
              style={{
                maxWidth: "100%",
                height: "auto",
                "@media (max-width: 430px)": { maxHeight: "300px" },
              }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev d-none"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next d-none"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {data.categoryData.map((foodcat) => (
        <div key={foodcat._id}>
          <div className="fs-3 m-3">{foodcat.catname}</div>
          <hr />
          <div className="card-container d-flex flex-wrap justify-content-evenly">
            {data.foodData
              .filter((foodIt) => foodcat.catname === foodIt.categoryName)
              .map((foodItem) => (
                <Card2 allitem={foodItem} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
