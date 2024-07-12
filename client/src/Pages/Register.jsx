import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/form.css"; // Import your CSS file
import Validation from "../Components/Validation";
import axios from 'axios'
import {toast} from 'react-toastify'


const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  // we now do validation
  const [serverErrors, setServerErrors] = useState([]);

  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = Validation(values);
    setErrors(errs);
    if (
      errors.name === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.username == ""
    ) {
      axios.post('',values).then(res =>{
        toast.success("Account Created Successfully",{
          position:"top-right",
          autoClose: 5000
        })
      }).catch(err =>{
        
      })
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              name="email"
              autoComplete="off"
              onChange={handleInput}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="form-control"
              name="username"
              onChange={handleInput}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="*******"
              className="form-control"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <button className="form-btn">Register</button>
          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
