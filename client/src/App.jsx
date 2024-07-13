import React, { createContext, useState } from "react";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext(null)

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
]);

// we store the data of each user 

const App = () => {
  const [user,setUser] = useState()
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