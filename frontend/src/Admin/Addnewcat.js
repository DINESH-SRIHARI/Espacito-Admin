import React, { useState, useEffect } from "react";
import catimg from "../statics/sigin.jpg";
import catcss from "../css/catcss.css";

export default function Addnewcat() {
  const [credentials, setCredentials] = useState({
    categoryName: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch and set categories data
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://espacito-admin.onrender.com/getcategories"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://espacito-admin.onrender.com/adminaddcat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryName: credentials.categoryName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh categories after adding a new one
      const newCategories = await fetch(
        "https://espacito-admin.onrender.com/getcategories"
      ).then((response) => response.json());
      setCategories(newCategories);

      // Clear the input field
      setCredentials({ categoryName: "" });
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await fetch(
        `https://espacito-admin.onrender.com/deletecategory/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh categories after deleting one
      const newCategories = await fetch(
        "https://espacito-admin.onrender.com/getcategories"
      ).then((response) => response.json());
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
            <li key={category._id}>
              {category.categoryName}
              <button
                className="btn btn-danger ms-2"
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
