import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import '../assets/css/Viewprofile.css'; // Import CSS if needed

const ViewProfile = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_GET_PROFILE}/${user.username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <div className="center-container">
      <div className="profile-container">
        <div className="profile-details">
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Date of Birth:</strong> {profile?.dob ? new Date(profile.dob).toLocaleDateString() : "Not provided"}</p>
          <p><strong>Institute:</strong> {profile?.institute || "Not provided"}</p>
          <p><strong>Gender:</strong> {profile?.gender || "Not provided"}</p>
        </div>
        <button className="edit-profile-btn" onClick={() => window.location.href = '/dashboard/edit-profile'}>Edit Profile</button>
      </div>
    </div>
  );
};

export default ViewProfile;
