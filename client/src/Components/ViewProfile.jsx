import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import '../assets/css/Viewprofile.css';
import Cookies from 'js-cookie';

const ViewProfile = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_GET_PROFILE}/${user.username}`
          , {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`
          },
        }
      );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <div className="center-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="profile-container">
          <h2>Profile</h2>
          <div className="profile-details">
            <p><strong>Name:</strong> {profile?.name}</p>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Date of Birth:</strong> {profile?.dob ? new Date(profile.dob).toLocaleDateString() : "Not provided"}</p>
            <p><strong>Institute:</strong> {profile?.institute || "Not provided"}</p>
            <p><strong>Gender:</strong> {profile?.gender || "Not provided"}</p>
          </div>
          <button
            className="edit-profile-btn"
            onClick={() => navigate('/dashboard/edit-profile')} // Navigate without full reload
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
