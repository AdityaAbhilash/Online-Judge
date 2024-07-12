import React from 'react'
import '../assets/css/navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-left">
            <a href="" className="navbar-brand">
                AlgoApex
            </a>
        </div>
        <div className="navbar-right">
            <a href="" className="navbar-link">About</a>
            <a href="" className="navbar-link">Login</a>
            <a href="" className="navbar-link">Register</a>

        </div>
    </div>
  )
}

export default Navbar