import React from 'react';
// import './About.css';
import "../assets/css/about.css";
import Navbar from '../Components/Navbar';

const About = () => {
  return (
    <>
    <Navbar />
    <div className="about-container">
      <div className="about-box">
        <h1>About Our Online Judge</h1>
        <p>
          Welcome to our Online Judge platform! We are dedicated to providing a comprehensive
          and user-friendly environment for coding enthusiasts and professionals alike.
          Our platform is designed to offer a seamless experience for learning, practicing, 
          and mastering programming skills. Whether you are preparing for competitive programming 
          contests, honing your problem-solving abilities, or simply enjoying the challenge of coding,
          our Online Judge is here to support you every step of the way.
        </p>
      </div>
      <div className="features-container">
        <div className="feature-box">
          <div className="icon">🔒</div>
          <h2>Security and Privacy</h2>
          <p>
            We prioritize your data's security and privacy. Our platform uses state-of-the-art 
            encryption and security protocols to ensure that your information and submissions are safe 
            and secure at all times.
          </p>
        </div>
        <div className="feature-box">
          <div className="icon">📚</div>
          <h2>Quality Content</h2>
          <p>
            Our problems are curated by experts in the field, ensuring you receive 
            high-quality, relevant content that challenges your skills and fosters growth.
          </p>
        </div>
        <div className="feature-box">
          <div className="icon">⚡</div>
          <h2>Instant Feedback</h2>
          <p>
            Receive immediate feedback on your submissions, helping you quickly understand 
            mistakes and learn from them. 
          </p>
        </div>
        <div className="feature-box">
          <div className="icon">📝</div>
          <h2>Create and Manage Problems</h2>
          <p>
            Create and manage your own problems. Our platform offers tools for problem creation, testing, and evaluation, 
            making it easy to contribute and collaborate.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
