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
import Problems from "./Components/Problems";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import NotFound from "./Pages/NotFound";
import EditProblem from "./Components/EditProblem";
import About from "./Pages/About";
import ViewProfile from "./Components/ViewProfile";
import EditProfile from "./Components/EditProfile";
import Submissions from "./Components/Submissions";
import YourProblems from "./Components/YourProblems";
import Cookies from "js-cookie";
import VerifyCode from "./Components/VerifyCode";

export const UserContext = createContext(null);

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
    path: "/about",
    element: <About />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Problems />,
      },
      {
        path: "/dashboard/add-problem",
        element: <AddProblem />,
      },
      {
        path: "/dashboard/edit-problem/:id",
        element: <EditProblem />,
      },
      { path: "/dashboard/view-profile", element: <ViewProfile /> },
      { path: "/dashboard/edit-profile", element: <EditProfile /> },
      { path: "/dashboard/submissions", element: <Submissions /> },
      { path: "/dashboard/your-problems", element: <YourProblems /> },
    ],
  },
  {
    path: "/problem/:id",
    element: (
      <ProtectedRoutes>
        <ProblemDetail />
      </ProtectedRoutes>
    ),
  },

  { path: "/logout", element: <Logout /> },
  { path: "/verify", element: <VerifyCode /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  // Initialize state
  const [user, setUser] = useState(null);
  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = Cookies.get("authToken");
    if (token) {
      axios
        .get(import.meta.env.VITE_GET_VERIFY, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};

export default App;
