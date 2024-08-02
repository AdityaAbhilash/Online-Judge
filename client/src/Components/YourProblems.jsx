import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { Alignment } from "react-data-table-component";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import CircleLoader from "react-spinners/CircleLoader";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "../assets/css/problem.css";
import Cookies from 'js-cookie';


const customStyles = {
    table: {
      style: {
        backgroundColor: "#1c1c1c", // Darker background for the table
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: 600,
        color: "#f1c40f", // Bright yellow for a striking contrast
        backgroundColor: "#2c3e50", // Darker background for header cells
        padding: "10px 10px",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        fontSize: "16px",
        fontWeight: 500,
        color: "#ecf0f1", // Light color for the cell text
        backgroundColor: "#2c3e50",
        justifyContent: "center",
      },
    },
    pagination: {
      style: {
        fontSize: "16px",
        backgroundColor: "#ecf0f1", // Match the darker background
        color: "#333", // Light color for pagination text
      },
      pageButtonsStyle: {
        border: "none",
        backgroundColor: "transparent",
        color: "#ecf0f1 !important",
        cursor: "pointer",
        padding: "5px 10px",
        margin: "0 5px",
        transition: "background-color 0.3s ease",
        '&:hover': {
          backgroundColor: "#ecf0f1", // Darker hover effect
          color: "#ecf0f1",
        },
      },
      pageButtonsStyleHover: {
        backgroundColor: "#ecf0f1", // Darker hover effect for rounded buttons
        borderRadius: "5px",
        color: "#ecf0f1",
      },
    },
  };


const MySwal = withReactContent(Swal);

const YourProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  
const [count,setCount] = useState(0);
 const deleteProblem = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_GET_PROBLEMS}/${id}`
            , {
            headers: {
              Authorization: `Bearer ${Cookies.get('authToken')}`
            },
          }
        )
          .then((res) => {
            // setProblems(res.data.problems);
            setProblems(prevProblems => prevProblems.filter(problem => problem._id !== id));
            MySwal.fire({
              title: "Deleted!",
              text: "The problem has been deleted.",
              icon: "success",
              
            });
          })
          .catch((err) => {
            MySwal.fire({
              title: "Error!",
              text: "Error Occurred!!!",
              icon: "error",

            });
          });
      }
    });
    setCount(count+1);
  }; 
  
  
  
  const handleEditClick = (e, row) => {
    if (row.public) {
      e.preventDefault(); // Prevent navigation
      MySwal.fire({
        title: "Error!",
        text: "You cannot edit public problems.",
        icon: "error",
      });
    }
  };

  const columns = [
    {
      name: "Problem Name",
      selector: (row) => <Link to={`/problem/${row._id}`} className="problem-name">{row.name}</Link>,
      width: "50%",
    },
    // {
    //   name: "Difficulty",
    //   selector: (row) => row.difficulty,
    //   // width: "40%",
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="table-icons">
          <Link 
            to={`/dashboard/edit-problem/${row._id}`}
            onClick={(e) => handleEditClick(e, row)}
          >
            <FaPenSquare className="table-icon edit-icon" />
          </Link>

          <FaTrashAlt className="table-icon delete-icon" onClick={() => deleteProblem(row._id)} />
        </div>
      ),
      width: "50%"
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_GET_YOUR_PROBLEMS
        , 
        {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        },
      }
    )
      .then((res) => {
        if (res.data.success) {
          setProblems(res.data.userProblems);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [count]);

  return (
    <>
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
        <div className="problem-list">
          <h2 className="page-heading">YOUR CREATED PROBLEMS</h2>
          <DataTable
            columns={columns}
            data={problems}
            customStyles={customStyles}
            pagination
          />
          {/* {problems.length === 0 && <h1>Add a Problem</h1>} */}
        </div>
      )}
    </>
  );
};

export default YourProblems;
