// src/Pages/Dashboard.jsx
import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import '../assets/css/dashboard.css';

const Dashboard = () => {
  const { problems, setProblems } = useContext(UserContext);

  const deleteProblem = (index) => {
    const newProblems = problems.filter((_, i) => i !== index);    // general format to delete the problem
    setProblems(newProblems);
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <h2 className="page-heading">Problems</h2>
        <table className="problems-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Problem Name</th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (    // index start at zero
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/problem/${index}`}>{problem.name}</Link>
                </td>
                <td>{problem.difficulty}</td>
                <td>
                  <button onClick={() => deleteProblem(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
