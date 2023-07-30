import { useState } from "react";
import "./ReturnToolButton.css";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
const ReturnToolButton = ({ toolId, toolName, index }) => {
  const { tools, setTools } = useContext(ProjectContext);
  const [clicked, setClicked] = useState(false);
  const handleReturnTool = async () => {
    try {
      await axios
        .put("http://localhost:5000/tools/updateTool", {
          toolId: toolId,
          toolName: toolName,
        })
        .then(({ data }) => {
          const newArr = [...tools];
          newArr[index] = data;
          setTools(newArr);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="returnTool-button-container">
      {clicked && (
        <button
          onClick={() => handleReturnTool()}
          className="return-tool-accept-button"
        >
          אישור
        </button>
      )}
      <button
        onClick={() => setClicked(!clicked)}
        className="return-tool-button"
      >
        החזר
      </button>
    </div>
  );
};

export default ReturnToolButton;
