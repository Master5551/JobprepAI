import React, { useState, useEffect } from "react";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import "./header.css"; // Import the CSS file
import axios from "axios";

const Header = () => {
  const [username, setUsername] = useState("User!!");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");
    let userId = "";
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      userId = decodedToken.id;
    } else {
      console.error("JWT token not found in local storage.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/candidate/${userId}`
      );
      const data = response.data;
      setProfilePicUrl(data.imageUrl);
      setUsername(data.username);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Periodically check local storage for updated image URL
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedImageUrl = localStorage.getItem("profileImageUrl");
      if (updatedImageUrl !== profilePicUrl) {
        setProfilePicUrl(updatedImageUrl);
      }
    }, 10); // Adjust interval as needed
    return () => clearInterval(interval);
  }, [profilePicUrl]);

  return (
    <div className="header">
      <div className="left-section">
        <span>Welcome, {username}</span>
      </div>
      <div className="right-section">
        <div className="profile-container">
          {profilePicUrl && (
            <img
              src={profilePicUrl}
              alt="Profile"
              className="profile-pic round"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
