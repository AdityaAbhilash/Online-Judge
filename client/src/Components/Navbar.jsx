import React, { useContext, useState, useEffect, useRef } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isLargeScreen && dropdownVisible) {
      const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownVisible(false);
        }
      };

      window.addEventListener("click", handleOutsideClick);
      return () => {
        window.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [dropdownVisible, isLargeScreen]);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownItemClick = () => {
    if (isLargeScreen) {
      setDropdownVisible(false);
    }
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
            <div className="navbar-item" ref={dropdownRef}>
              <span className="navbar-link" onClick={toggleDropdown}>
                Problems
              </span>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    Solve Problems
                  </Link>
                  <Link
                    to="/dashboard/add-problem"
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    Set Problems
                  </Link>
                  <Link
                    to="/dashboard/your-problems"
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    Your Problems
                  </Link>
                </div>
              )}
            </div>
            <Link to="/dashboard/Submissions" className="navbar-link">
              Submissions
            </Link>
            <Link to="/dashboard/view-profile" className="navbar-link">
              {/* {user.name.split(" ")[0]} */}
              Profile
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
