import React, { useEffect, useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./ProjectPage.css";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

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

    getAllProjects();
  }, []);

  const getStatus = (finishDate) => {
    const currentDate = new Date();
    return currentDate > new Date(finishDate) ? "בעבודות" : "הסתיים";
  };

  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleProjectClick = (projectId) => {
    // Save the projectId in the local storage
    localStorage.setItem("selectedProjectId", projectId);

    // Redirect to the project tools page
    navigate(`/dashboard`);
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
                סטטוס פרוויקט: {getStatus(project.finishDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
