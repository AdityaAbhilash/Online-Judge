import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../assets/css/Viewprofile.css';
import { toast } from 'react-toastify'; // Import toast notification library
import Cookies from 'js-cookie';

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    name: "",
    dob: "",
    institute: "",
    gender: ""
  });
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_GET_PROFILE}/${user.username}`
        , {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        },
      }
    )
        .then(response => setProfile(response.data))
        .catch(error => console.error("Error fetching profile:", error));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_PUT_PROFILE}/${user.username}`, profile
        , {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        },
      }
    );
      setUser({ ...user, ...response.data.profile });
      setProfile(response.data.profile);
      toast.success("Profile updated"); // Show success toast notification
      navigate('/dashboard/view-profile'); // Redirect to ViewProfile page
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile"); // Show error toast notification
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h2 className="heading">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="institute">Institute</label>
            <input
              type="text"
              name="institute"
              value={profile.institute}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className="form-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
