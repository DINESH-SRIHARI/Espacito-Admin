import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Adminlogin from "../statics/adminlogin.jpg";
import logincss from "../css/login.module.css";
export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://espacito-admin.onrender.com/loginuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        console.log("response");
        alert("Enter Valid Details");
      }
      if (!json.success) {
        alert("Enter Valid Details");
      }
      if (json.success) {
        console.log("sucesses");
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authtoken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="row container">
        <div className={logincss.flex}>
          <div className="m-3 col-md-6 ">
            <img src={Adminlogin} className={logincss.img} />
          </div>
          <div className={[logincss.flex, logincss.form].join(" ")}>
            <form onSubmit={handleSubmit}>
              <div className="m-3">
                <label htmlFor="exampleInputEmail1" className="form-label ">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control "
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
              <div className="m-3">
                <label htmlFor="exampleInputPassword1" className="form-label ">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control "
                  id="exampleInputPassword1"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
