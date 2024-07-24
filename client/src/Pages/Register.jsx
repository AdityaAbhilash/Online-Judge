import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/form.css"; // Import your CSS file
import Validation from "../Components/Validation";
import axios from 'axios'
import {toast} from 'react-toastify'
import Navbar from "../Components/Navbar";


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

  const navigate = useNavigate() // TO directly navigate to the login page 


  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = Validation(values);  // you have made a function on validation  // THIS IS THE VALIDATION ERROR
    setErrors(errs);

    if (
      errs.name === "" &&
      errs.email === "" &&                        // first we have to check errors in frontend and then we go to backend 
      errs.password === "" &&
      errs.username == ""
    ) {
      axios.post('http://localhost:3000/register',values).then(res =>{    // end point api to post the data here in the api 
        if(res.data.success){
          toast.success("Account Created Successfully",{
            position:"top-right",
            autoClose: 5000
          })
          navigate('/login')
        }
       
      }).catch(err =>{
          if(err.response.data.errors){
            setServerErrors(err.response.data.errors)    // This is the server error 
          }
          else{
            console.log(err)
          }

      })
    }
  };

  return (
    <>
    <Navbar />
    <div className="center-container">
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter Name"
            className={`form-control ${errors.name && 'error-border'}`}
            name="name"
            onChange={handleInput}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            className={`form-control ${errors.email && 'error-border'}`}
            name="email"
            autoComplete="off"
            onChange={handleInput}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Enter Username"
            className={`form-control ${errors.username && 'error-border'}`}
            name="username"
            onChange={handleInput}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="*******"
            className={`form-control ${errors.password && 'error-border'}`}
            name="password"
            onChange={handleInput}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>


        {
          serverErrors.length > 0 && (
            serverErrors.map((error,index) =>(                                // display the error above the button 
              <p className="error" key = {index}>{error.msg}</p>
            ))
          )
        }


        <button className="form-btn" type="submit">Register</button>
        <p className="already-registered">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  </div>
  </>
  );
};

export default Register;
