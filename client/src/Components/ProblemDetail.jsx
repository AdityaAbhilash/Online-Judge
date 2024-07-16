import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircleLoader from "react-spinners/CircleLoader";
import Navbar from "./Navbar";
import '../assets/css/problemDetail.css'; // Import your CSS file for styling

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/problem/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setProblem(res.data.problem);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loader">
          <CircleLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="problem-details-page">
          <div className="left-half">
            <div className="problem-details-container">
              {problem && (
                <>
                  <h1 className="problem-name">{problem.name}</h1>
                  <p className="problem-statement">{problem.statement}</p>
                  <h3 className="section-heading">Sample Input:</h3>
                  <pre className="code-block">{problem.sampleInput}</pre>
                  <h3 className="section-heading">Sample Output:</h3>
                  <pre className="code-block">{problem.sampleOutput}</pre>
                  <div className="problem-info">
                    <div className="info-item">
                      <h3 className="info-label">Difficulty:</h3>
                      <p className="info-value">{problem.difficulty}</p>
                    </div>
                    <div className="info-item">
                      <h3 className="info-label">Time Limit:</h3>
                      <p className="info-value">1s</p>
                    </div>
                    <div className="info-item">
                      <h3 className="info-label">Memory Limit:</h3>
                      <p className="info-value">256MB</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="right-half">
            {/* Placeholder for future content */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemDetails;
