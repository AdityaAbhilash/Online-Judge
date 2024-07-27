import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import CircleLoader from "react-spinners/CircleLoader";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "../assets/css/problem.css";



const customStyles = { // styling the DataTable 
  headCells: {
    style: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#2c3e50",
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      fontWeight: 500,
      color: "#34495e",
    },
  },
  pagination: {
    style: {
      fontSize: "16px",
    },
    pageButtonsStyle: {
      border: "none !important",
      backgroundColor: "transparent !important",
      color: "#34495e !important",
      cursor: "pointer",
      padding: "5px 10px !important",
      margin: "0 5px !important",
      transition: "background-color 0.3s ease",
      '&:hover': {
        backgroundColor: "#f2f2f2",
        color: "#2c3e50",
      },
    },
    pageButtonsStyleHover: {
      backgroundColor: "#f2f2f2 !important", 
      borderRadius: "5px",
      color: "#2c3e50 !important", 
    },
  },
};

const MySwal = withReactContent(Swal);

const Problems = () => {
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
          .delete(`http://localhost:3000/problems/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
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
    },
    {
      name: "Difficulty",
      selector: (row) => row.difficulty,
    },
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
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/problems", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setProblems(res.data.problems);
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
          <h2 className="page-heading">PROBLEMS</h2>
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

export default Problems;
