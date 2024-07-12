// Home.js
import React from 'react';
import '../assets/css/home.css'
import Navbar from '../Components/Navbar'

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">Welcome to AlgoApex Online Judge</h1>
        <p className="home-description">
          Start solving problems, improve your skills, and compete with others!
        </p>
        <a href="/problems" className="home-button">Start Solving</a>
      </div>
    </div>
    </>
  );
}

export default Home;
