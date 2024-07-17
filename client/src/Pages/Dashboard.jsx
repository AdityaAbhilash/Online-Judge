import React from "react";
import Navbar from "../Components/Navbar";
import "../assets/css/dashboard.css";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
    <Navbar />
      <div className="dashboard-container">
        
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
