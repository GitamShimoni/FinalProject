import "./CreateATool.css";
import { useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";

const CreateATool = () => {
  const { setTools } = useContext(ProjectContext);
  const [toolName, setToolName] = useState("");

  const handleCreateTool = async () => {
    try {
      await axios
        .post(
          `${Host}/tools/createTool`,
          {
            toolName: toolName,
          },
          {
            headers: {
              projectId: localStorage.getItem("selectedProjectId"),
            },
          }
        )
        .then(({ data }) => {
          console.log(data, "THIS IS THE ANSWER OF CREATE TOOL");
          setTools(data.tools);
          //   setToolName(""); SHOULD ADD A RESET TO THE INPUT
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="createatool-container">
      <h2 id="createatool-header">צור כלי חדש</h2>
      <div id="createatool-input-div">
        <input
          onChange={(e) => setToolName(e.target.value)}
          id="createatool-input"
          type="text"
          placeholder="שם הכלי"
        />
        <button
          onClick={() => {
            handleCreateTool();
          }}
          id="createatool-button"
        >
          הוסף
        </button>
      </div>
    </div>
  );
};

export default CreateATool;
