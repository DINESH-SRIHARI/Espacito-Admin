import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Addnewcat() {
  const [credentials, setCredentials] = useState({
    categoryName: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook to get the navigation function

  useEffect(() => {
    // Fetch and set categories data
    const fetchCategories = async () => {
      try {
        const response = await axios.post("http://localhost:5000/getcategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this effect runs only once

  useEffect(() => {
    console.log(categories); // Log updated categories whenever it changes
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/adminaddcat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: credentials.categoryName,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        alert("Error Occur");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (json.success) {
        alert("New Category Added Sucessfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/deletecategory/${categoryId}`, {
        method: "DELETE",
      });
      const json = await response.json();
      if (json.success) {
        alert("New Category Added Sucessfully");
        window.location.reload();
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newCategories = await fetch("http://localhost:5000/getcategories").then((response) =>
        response.json()
      );
      setCategories(newCategories);
      
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex">
      <div className="col-md-4 justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              CategoryName
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="categoryName"
              value={credentials.categoryName}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <div className="col-md-8">
        <h4>Categories:</h4>
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="mt-3">
              {category.catname}
              <button
                className="btn btn-outline-danger  ms-2"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
