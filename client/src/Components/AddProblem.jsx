import React, { useState } from 'react';
import Navbar from './Navbar';
import "../assets/css/addProblem.css";

const AddProblem = () => {
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const deleteTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleTestCaseChange = (index, event) => {
    const { name, value } = event.target;
    const newTestCases = [...testCases];
    newTestCases[index][name] = value;
    setTestCases(newTestCases);
  };

  return (
    <>
      <Navbar />
      <div className="add-problem-container">
        <h1>Problem Setting Page</h1>
        <form>
          <div className="form-group">
            <label htmlFor="problem-name">Problem Name:</label>
            <input type="text" id="problem-name" name="problemName" />
          </div>
          <div className="form-group">
            <label htmlFor="problem-statement">Problem Statement:</label>
            <textarea id="problem-statement" name="problemStatement" />
          </div>
          <div className="form-group">
            <label htmlFor="sample-input">Sample Input:</label>
            <textarea id="sample-input" name="sampleInput" />
          </div>
          <div className="form-group">
            <label htmlFor="sample-output">Sample Output:</label>
            <textarea id="sample-output" name="sampleOutput" />
          </div>
          <div className="form-group">
            <label htmlFor="difficulty-level">Difficulty Level:</label>
            <select id="difficulty-level" name="difficultyLevel">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <h2>Add Test Case</h2>
          {testCases.map((testCase, index) => (
            <div key={index} className="test-case">
              <div className="form-group">
                <label htmlFor={`input-${index}`}>Input:</label>
                <textarea
                  id={`input-${index}`}
                  name="input"
                  value={testCase.input}
                  onChange={(event) => handleTestCaseChange(index, event)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`output-${index}`}>Output:</label>
                <textarea
                  id={`output-${index}`}
                  name="output"
                  value={testCase.output}
                  onChange={(event) => handleTestCaseChange(index, event)}
                />
              </div>
              <button type="button" onClick={() => deleteTestCase(index)}>Delete</button>
            </div>
          ))}
          <button type="button" onClick={addTestCase}>Add Test Case</button>
        </form>
      </div>
    </>
  );
};

export default AddProblem;
