import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { UserContext } from '../App';
import '../assets/css/addProblem.css';
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';


const EditProblem = () => {
  const [problem, setProblem] = useState({
    name: '',
    statement: '',
    sampleInput: '',                 
    sampleOutput: '',
    difficulty: 'Easy',
    testCases: [{ input: '', output: '' }],
  });

  
  const navigate = useNavigate();   


  const handleInputChange = (e) => {    // 'e' here reffer to the event triggered and it contains target ans stores in the form of value pair 
    const { name, value } = e.target;   // e here contains all the value of the new input provided by user 
    setProblem({ ...problem, [name]: value });  // store as a object 
  };



  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target;                      // name here indecates input and output
    const newTestCases = [...problem.testCases];
    newTestCases[index][name] = value;
    setProblem({ ...problem, testCases: newTestCases });
  };

  const addTestCase = () => {
    setProblem({ ...problem, testCases: [...problem.testCases, { input: '', output: '' }] });
  };

  const removeTestCase = (index) => {
    const newTestCases = problem.testCases.filter((_, i) => i !== index);  // _ is the placeholder not needed and we needed index 
    setProblem({ ...problem, testCases: newTestCases });
  };

  const {id} = useParams()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_POST_UPDATE_PROBLEMS}/${id}`, problem
        , {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        }
      }
    )
      .then((res) => {
        if (res.data.success) {
          toast.success("Problem Updated Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate("/dashboard/your-problems");
        }
      })
      .catch((err) => {
          console.log(err);
      });
  };

  

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_GET_PROBLEMS}/${id}`
        , {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        },
      }
    )
      .then((res) => {
        if (res.data.success) {
        setProblem({
            name: res.data.name,
            statement: res.data.statement,
            sampleInput:res.data.sampleInput,            
            sampleOutput:res.data.sampleOutput,  
            difficulty:res.data.difficulty,
            testCases: res.data.testCases.map(testCase => ({
                input: testCase.input,
                output: testCase.output
            }))
        })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>
    <div className="add-problem-container">
      <h2 className="heading">EDIT PROBLEM</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Problem Name:</label> 
          <input
            type="text"
            name="name"   // this name attribute is needed to handel input change 
            value= {problem.name}                // in form these two are in use , value = problem ans onhange = { function that change value }
            onChange = {handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="statement">Problem Statement:</label>
          <textarea
            name="statement"
            value={problem.statement}
            onChange={handleInputChange}
            required
          ></textarea>
        </div> 

        <div className="form-group">
          <label htmlFor="sampleInput">Sample Input:</label>
          <textarea
            name="sampleInput"
            value={problem.sampleInput}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="sampleOutput">Sample Output:</label>
          <textarea
            name="sampleOutput"
            value={problem.sampleOutput}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty Level:</label>
          <select
            name="difficulty"
            value={problem.difficulty}                  // in form we use select fo the popdown mwnu 
            onChange={handleInputChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <h3 className="heading">ADD TEST CASES</h3>

        {problem.testCases.map((testCase, index) => (
          <div className="test-case" key={index}>
            <div className="form-group">
              <label htmlFor={`input-${index}`}>Input:</label>
              <textarea
                name="input"
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, e)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor={`output-${index}`}>Output:</label>
              <textarea
                name="output"
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, e)}   // should execute on change not on refreshing , e to pass as argument 
                required
              ></textarea>
            </div>


            <button type="button" onClick={() => removeTestCase(index)}>
              Delete Test Case
            </button>
          </div>
        ))}


        <div className="add-test-case-button">
          <button type="button" onClick={addTestCase}>
            Add Test Case
          </button>
        </div>


        <button type="submit">      
            Update           
        </button>  
      </form>
    </div>
    </>
  );
};

export default EditProblem;



