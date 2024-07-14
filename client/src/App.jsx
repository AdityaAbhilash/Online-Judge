import React, { createContext, useEffect, useState } from "react";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dashboard from "./Pages/Dashboard";
import Problems from "./Components/Problems";


export const UserContext = createContext(null)  // usercontext holds the data 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    // children: [
    //   {
    //     index: true,
    //     element: <Problems /> 
    //   }
    // ]
  }
]);

// we store the data of each user 

const App = () => {
  const [user,setUser] = useState() // we dont have to create this at every slide so we pass it by value
  
  useEffect(()=>{
    axios.get('http://localhost:3000/verify',{
      headers:{
        Authorization: `Berear ${localStorage.getItem('token')}`
      }
    }).then(res =>{
      if(res.data.success){
        setUser(res.data.user)
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])


  return (
    <>
      <ToastContainer />                                         
      <UserContext.Provider value = {{user,setUser}}>

      <RouterProvider router={router} />

      </UserContext.Provider>
    </>
  );
};

export default App;


// remember to use the tost container to shot the tost
//A UserProvider component is created to wrap the entire application, making user data available to all components.
