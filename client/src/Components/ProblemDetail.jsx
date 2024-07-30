import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircleLoader from "react-spinners/CircleLoader";
import Navbar from "./Navbar";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import "../assets/css/problemDetail.css";

const prewrittenCodes = {
  cpp: `#include <iostream>

using namespace std;

int main() {
    cout << "Hello World!";
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello World!");
    return 0;
}`,
  py: `print("Hello World!")`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
};

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(prewrittenCodes.cpp);
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [verdicts, setVerdicts] = useState([]);
  const [activeTab, setActiveTab] = useState("input"); // This is the default active tab after refresh

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_GET_PROBLEMS}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setProblem(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(prewrittenCodes[selectedLanguage]);
  };

  const handleRun = async () => {
    const payload = {
      language,
      code,
      input,
    };

    try {
      const { data } = await axios.post(import.meta.env.VITE_POST_RUN, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOutput(data.output);
      setActiveTab("output");
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data && error.response.data.message) {
        setOutput(error.response.data.message);
      } else {
        setOutput("An unexpected error occurred.");
      }
      setActiveTab("output");
    }
  };

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
  
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_POST_SUBMIT}/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVerdicts(data.verdicts);
      setActiveTab('verdict');  
    } catch (error) {
      console.log(error.response);
    }
  };
  
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
            <div className="code-editor-container">
              <select
                onChange={handleLanguageChange}
                value={language}
                className="select-language"
              >
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="py">Python</option>
                <option value="java">Java</option>
              </select>
              <div className="code-editor">
                <Editor
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    outline: "none",
                    border: "none",
                    backgroundColor: "#f5f5f5",
                    color: "#000",               // Black text color
                    height: "60vh",
                    overflowY: "auto",
                    
                  }}
                />
              </div>
              <div className="tabs">
                <button
                  className="tab-button"
                  onClick={() => setActiveTab("input")}
                  style={{
                    backgroundColor:
                      activeTab === "input" ? "#3498db" : "#f7fafc",
                  }}
                >
                  Input
                </button>
                <button
                  className="tab-button"
                  onClick={() => setActiveTab("output")}
                  style={{
                    backgroundColor:
                      activeTab === "output" ? "#3498db" : "#f7fafc",
                  }}
                >
                  Output
                </button>
                <button
                  className="tab-button"
                  onClick={() => setActiveTab("verdict")}
                  style={{
                    backgroundColor:
                      activeTab === "verdict" ? "#3498db" : "#f7fafc",
                  }}
                >
                  Verdict
                </button>
              </div>
              <div className="tab-content">
                {activeTab === "input" && (
                  <div className="input-container">
                    <h2 className="input-heading">Input</h2>
                    <textarea
                      rows="12"
                      cols="15"
                      value={input}
                      placeholder="Input"
                      onChange={(e) => setInput(e.target.value)}
                      className="input-textarea"
                      style={{ width: "97%" }}
                    ></textarea>
                  </div>
                )}
                {activeTab === "output" && (
                  <div className="output-container">
                    <h2 className="output-heading">Output</h2>
                    <pre>{output}</pre>
                  </div>
                )}
                {activeTab === "verdict" && (
                  <div className="verdict-container">
                    <h2 className="verdict-heading">Verdict</h2>
                    <pre>{verdicts.length > 0 ? (
                      <ul>
                        {verdicts.map((verdict, index) => (
                          <li key={index}>
                            Test Case {verdict.testCase}: {verdict.status}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No verdicts available.</p>
                    )}</pre>
                  </div>
                )}
              </div>
              <div className="button-container">
                <button
                  onClick={handleRun}
                  type="button"
                  className="run-button"
                >
                  Run
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="submit-button"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemDetails;
