import React from 'react'
import Navbar from '../Components/Navbar'
import '../assets/css/dashboard.css';
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
        <Navbar />
            <div className="content">
                <Outlet />
            </div>
    </>
  )
}

export default Dashboard
