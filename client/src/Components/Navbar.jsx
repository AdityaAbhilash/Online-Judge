import React, { useContext,useState } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          AlgoApex
        </Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <div className="navbar-item">
              <span className="navbar-link" onClick={toggleDropdown}>
                Problems
              </span>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <Link to="/dashboard" className="dropdown-item">
                    Solve Problems
                  </Link>
                  <Link to="/dashboard/add-problem" className="dropdown-item">
                    Set Problems
                  </Link>
                  <Link to="/dashboard/your-problems" className="dropdown-item">
                    Your Problems
                  </Link>
                </div>
              )}
            </div>
            <Link to="/dashboard/Submissions" className="navbar-link">
              Submissions
            </Link>
            <Link to="/dashboard/view-profile" className="navbar-link">
              {user.name.split(" ")[0]}
            </Link>
            <Link to="/logout" className="navbar-link">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/about" className="navbar-link">
              About
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
