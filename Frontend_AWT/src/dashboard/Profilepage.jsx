import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profilepage.css";
import { FaCheck, FaEdit, FaUser } from "react-icons/fa";
import { IconButton, Typography } from "@mui/material";

function ProfilePage() {
  const [editable, setEditable] = useState(false); // State variable to track edit mode
  const [imageUrl, setImageUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [experience, setExperience] = useState(0);
  const token = localStorage.getItem("token");
  let userId = "";
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded JWT token:", decodedToken);
    userId = decodedToken.id;
    console.log("User ID:", userId);
  } else {
    console.error("JWT token not found in local storage.");
  }

  const fetchCandidateData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/candidate/${userId}`
      );

      const data = response.data;
      console.log(data);
      // Update state with fetched data
      setImageUrl(data.profile_pic_path || "");
      setFirstName(data.firstName || "");
      setMiddleName(data.middleName || "");
      setLastName(data.lastName || "");
      setDescription(data.description || "");
      setGithubLink(data.githubLink || "");
      setLinkedinLink(data.linkedinLink || "");
      setExperience(data.experience || "");
    } catch (error) {
      console.error("Error fetching candidate data:", error);
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, []);

  useEffect(() => {
    // Retrieve imageUrl from local storage when component mounts
    const storedImageUrl = localStorage.getItem("profileImageUrl");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", userId);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/upload",
        formData
      );
      const uploadedImageUrl = response.data.imageUrl;
      // Store uploaded image URL in local storage
      localStorage.setItem("profileImageUrl", uploadedImageUrl);
      setImageUrl(uploadedImageUrl);
      // Keep the file input visible after successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleEditClick = () => {
    setEditable(true); // Enable editing mode
  };

  const handleSubmitClick = async () => {
    setEditable(false); // Disable editing mode
    try {
      const response = await axios.put(
        `http://localhost:8080/api/candidate/${userId}`,
        {
          firstName,
          middleName,
          lastName,
          description,
          githubLink,
          linkedinLink,
        }
      );
      console.log("Updated data:", response.data);
    } catch (error) {
      console.error("Error updating candidate data:", error);
    }
  };

  return (
    <div className="profile-container">
      <div>
        <label className="file-input-label">
          <input
            className="file-input"
            type="file"
            onChange={handleImageUpload}
            disabled={!editable} // Disable file input if not editable
          />
          Choose File
        </label>
      </div>
      <div className="image-container">
        {imageUrl ? (
          <img className="profile-image" src={imageUrl} alt="Profile" />
        ) : (
          <div className="default-icon">
            <FaUser
              style={{
                fontSize: "9em",
                marginLeft: "25px",
                marginTop: "10px",
                color: "white",
              }}
            />
          </div>
        )}
      </div>

      <div className="details-container">
        <div className="input-container">
          <label htmlFor="first-name" className="label">
            First Name:
          </label>
          <input
            id="first-name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!editable} // Disable input field if not editable
          />
        </div>
        <div className="input-container">
          <label htmlFor="middle-name" className="label">
            Middle Name:
          </label>
          <input
            id="middle-name"
            type="text"
            placeholder="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            disabled={!editable} // Disable input field if not editable
          />
        </div>
        <div className="input-container">
          <label htmlFor="last-name" className="label">
            Last Name:
          </label>
          <input
            id="last-name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!editable} // Disable input field if not editable
          />
        </div>
        <div className="input-container">
          <label htmlFor="description" className="label">
            Description:
          </label>
          <textarea
            id="description"
            placeholder="Short Description (500 characters)"
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!editable} // Disable textarea if not editable
          ></textarea>
        </div>
        <div className="input-container">
          <label htmlFor="github-link" className="label">
            GitHub Link:
          </label>
          <input
            id="github-link"
            type="text"
            placeholder="GitHub Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            disabled={!editable} // Disable input field if not editable
          />
        </div>
        <div className="input-container">
          <label htmlFor="linkedin-link" className="label">
            LinkedIn Link:
          </label>
          <input
            id="linkedin-link"
            type="text"
            placeholder="LinkedIn Link"
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
            disabled={!editable} // Disable input field if not editable
          />
        </div>

        <div className="button-container">
          {!editable && (
            <IconButton
              style={{
                width: "120px",
                height: "40px",
                borderRadius: "5px",
                marginRight: "10px",
                border: "1px solid blue",
              }}
              color="danger"
              onClick={handleEditClick}
            >
              <FaEdit style={{ color: "blue" }} />
              <Typography style={{ marginLeft: "5px" }}>Edit</Typography>
            </IconButton>
          )}
          {editable && (
            <IconButton
              style={{
                width: "120px",
                height: "40px",
                borderRadius: "5px",
                marginRight: "10px",
                border: "1px solid blue",
              }}
              color="primary"
              onClick={handleSubmitClick}
            >
              <FaCheck />
              <Typography style={{ marginLeft: "5px" }}>Submit</Typography>
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
