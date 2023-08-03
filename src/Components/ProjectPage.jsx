import React, { useEffect, useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import { Link, useNavigate } from "react-router-dom";
import UpdateUserForm from "./UpdateUserForm"; // Import the UpdateUserForm component
import "./ProjectPage.css";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [token, setToken] = useState(""); // Add state for token
  const navigate = useNavigate();

  function formatDate(dateString) {
    const dateSegments = dateString.split("T");
    const datePart = dateSegments[0].split("-").reverse().join(".");
    const timePart = dateSegments[1].split(":").slice(0, 2).join(":");
    return `${datePart}`;
  }

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const response = await axios.get(`${Host}/project/getAll`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${Host}/users/getUsers`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchToken = async () => {
      try {
        // You can fetch the token from your preferred source (e.g., local storage, cookies, etc.)
        const token = await getTheTokenFromSomeSource();
        setToken(token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    getAllProjects();
    getAllUsers();
    fetchToken(); // Fetch and set the token when the component mounts
  }, []);

  const getStatus = (finishDate) => {
    const currentDate = new Date();
    return currentDate > new Date(finishDate) ? "בעבודות" : "הסתיים";
  };

  const handleProjectClick = (projectId) => {
    localStorage.setItem("selectedProjectId", projectId);
    navigate(`/dashboard`);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div id="project-holder">
      <h1 className="projectPage-headline">פרוייקטים</h1>
      <div className="project-container">
        {projects.map((project) => (
          <div className="project-wrapper" key={project._id}>
            <div
              className="project-square"
              onClick={() => handleProjectClick(project._id)}
            >
              <h2 className="project-name">{project.name}</h2>
            </div>
            <div className="project-info">
              <p className="project-info">
                תחילת עבודות: {formatDate(project.startingDate)}
              </p>
              <p className="project-info">
                סטטוס פרוייקט: {getStatus(project.finishDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="projectPage-headline">משתמשים</h1>
      <div className="user-container">
        {users.map((user) => (
          <div className="user-wrapper" key={user._id}>
            <div
              className="user-square"
              onClick={() => handleUserClick(user._id)}
            >
              <h2 className="user-name">{user.fullName}</h2>
            </div>
            <div className="user-info">
              <p className="user-info">
                <Link to={`/updateUser`}>
                  <button>ערוך משתמש</button>
                </Link>
              </p>
              <p className="user-info"></p>
            </div>
          </div>
        ))}
      </div>
      {selectedUserId && (
        <div className="update-user-container">
          <UpdateUserForm token={token} userId={selectedUserId} />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
