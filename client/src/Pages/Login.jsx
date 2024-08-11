import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/form.css"; // Import your CSS file
import Validation from "../Components/Validation";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import Navbar from "../Components/Navbar";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const { user, setUser } = useContext(UserContext);

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  // we now do validation
  const [serverErrors, setServerErrors] = useState([]);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // TO directly navigate to the login page

  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = Validation(values); // you have made a function on validation
    setErrors(errs);

    if (
      // first we have to check errors in frontend and then we go to backend
      errs.password === "" &&
      errs.username == ""
    ) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        values.password,
        import.meta.env.VITE_ENCRYPTION_KEY
      ).toString();

      axios
        .post(import.meta.env.VITE_POST_LOGIN, {
          username: values.username,
          password: encryptedPassword, // Send encrypted password
        }) // after passing the value there is a response (res)
        .then((res) => {
          // end point api to post the data here in the api
          console.log(res);
          if (res.data.success) {
            toast.success("Login Successfully", {
              position: "top-right",
              autoClose: 5000,
            });

            // localStorage.setItem("token",res.data.token)
            Cookies.set("authToken", res.data.token, {
              secure: true,
              sameSite: "None",
            });
            setUser(res.data.user);
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServerErrors(err.response.data.errors);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="center-container">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                placeholder="Enter Username"
                className={`form-control ${errors.username && "error-border"}`}
                name="username"
                onChange={handleInput}
                required
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="password-container">
              <input
                // type="password"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                className={`form-control ${errors.password && "error-border"}`}
                name="password"
                onChange={handleInput}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye:faEyeSlash}
                className="show-hide-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            {serverErrors.length > 0 &&
              serverErrors.map(
                (
                  error,
                  index // display the error above the button
                ) => (
                  <p className="error" key={index}>
                    {error.msg}
                  </p>
                )
              )}

            <button className="form-btn" type="submit">
              Login
            </button>
            <p className="already-registered">
              Don't Have Account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
