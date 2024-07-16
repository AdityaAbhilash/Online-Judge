import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import '../assets/css/problemDetail.css';
import Navbar from './Navbar';

const ProblemDetails = () => {
  const { problems } = useContext(UserContext);
  const { id } = useParams();
  const problem = problems[id];

  if (!problem) {
    return <div>Problem not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="problem-details-container">
        <div className="left-half">
          <h2>{problem.name}</h2>
          <p>{problem.statement}</p>
          <h3>Sample Input:</h3>
          <pre>{problem.sampleInput}</pre>
          <h3>Sample Output:</h3>
          <pre>{problem.sampleOutput}</pre>
          {/* {problem.testCases.map((testCase, index) => (
            <div key={index}>
              <h3>Test Case {index + 1}</h3>
              <p><strong>Input:</strong></p>
              <pre>{testCase.input}</pre>
              <p><strong>Output:</strong></p>
              <pre>{testCase.output}</pre>
            </div>
          ))} */}
          <h3>Time Limit: 1s</h3>
          <h3>Memory Limit: 256MB</h3>
        </div>
        <div className="right-half">
          {/* This space is left blank for future use */}
        </div>
      </div>
    </>
  );
};

export default ProblemDetails;
