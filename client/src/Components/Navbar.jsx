import React from 'react'
import '../assets/css/navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-left">
            <Link to ="/" className="navbar-brand">
                AlgoApex
            </Link>
        </div>
        <div className="navbar-right">
            <Link to='/about' className="navbar-link">About</Link>
            <Link to='/login' className="navbar-link">Login</Link>
            <Link to='/register' className="navbar-link">Register</Link>

        </div>
    </div>
  )
}

export default Navbar