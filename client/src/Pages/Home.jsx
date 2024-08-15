import React from 'react';
import '../assets/css/home.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="home">
        <div className="home-content">
          <div className="logo-container">
            <div className="circular-logo">
              <div className="outer-circle">
                <div className="inner-circle">
                  <div className="logo-text">AlgoApex</div>
                </div>
              </div>
              <div className="decorative-elements">
                <div className="bracket left-bracket"></div>
                <div className="bracket right-bracket"></div>
              </div>
            </div>
          </div>
          {/* <h1 className="home-title">Welcome to AlgoApex Online Judge</h1>
          <p className="home-description">
            Start solving problems, improve your skills, and compete with others!
          </p> */}
          <h1 className="home-title animate-text">Welcome to AlgoApex Online Judge</h1>
          <p className="home-description animate-text">Start solving problems, improve your skills, and compete with others!</p>
          <div className="home-buttons">
            <a href="/dashboard" className="home-button">Start Solving</a>
            <a href="/about" className="home-button secondary">Learn More</a>
            {/* <a href="/register" className="home-button tertiary">Join Now</a> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
