import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircleLoader from "react-spinners/CircleLoader";
import Navbar from "./Navbar";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import '../assets/css/problemDetail.css';

const prewrittenCodes = {
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello World!";
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
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/problems/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res)
        if (res.data.success){
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

  const handleSubmit = async () => {
    const payload = {
      language,
      code
    };

    try {
      const { data } = await axios.post('http://localhost:3000/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  }

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
              <h2 className="editor-heading">Code Editor</h2>
              <select onChange={handleLanguageChange} value={language} className="select-language">
                <option value='cpp'>C++</option>
                <option value='c'>C</option>
                <option value='py'>Python</option>
                <option value='java'>Java</option>
              </select>
              <div className="code-editor">
                <Editor
                  value={code}
                  onValueChange={code => setCode(code)}
                  highlight={code => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    outline: 'none',
                    border: 'none',
                    backgroundColor: '#f7fafc',
                    height: '500px',
                    overflowY: 'auto'
                  }}
                />
              </div>
              <div className="button-container">
                <button onClick={handleSubmit} type="button" className="run-button">Run</button>
                <button onClick={handleSubmit} type="button" className="submit-button">Submit</button>
              </div>
              <div className="outputbox">
                <h3>Output:</h3>
                <pre>{output}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemDetails;
