import React, { createContext, useEffect, useState } from "react";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dashboard from "./Pages/Dashboard";
import AddProblem from "./Components/AddProblem";
import ProblemDetail from "./Components/ProblemDetail";
import Logout from "./Components/Logout";

export const UserContext = createContext(null);

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/addProblem", element: <AddProblem /> },
  { path: "/problem/:id", element: <ProblemDetail /> },
  { path: "/logout", element: <Logout /> }
]);

const App = () => {
  // Initialize state
  const [user, setUser] = useState(null);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Example authentication check with token
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/verify', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.success) setUser(res.data.user);
      }).catch(err => {
        console.log(err);
      });
    }
  }, []);

  // useEffect(() => {
  //   // Fetch problems from backend
  //   const fetchProblems = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/problems');
  //       setProblems(response.data); // Assuming response.data is an array of problems
  //     } catch (error) {
  //       console.error('Error fetching problems:', error);
  //     }
  //   };

  //   fetchProblems();
  // }, []);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser, problems, setProblems }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};

export default App;
