import { useState } from "react";
import "./ReturnToolButton.css";
import axios from "axios";
const ReturnToolButton = ({ toolId, toolName }) => {
  const [clicked, setClicked] = useState(false);
  const handleReturnTool = async () => {
    try {
      await axios.put("http://localhost:5000/tools/updateTool", {
        toolId: toolId,
        toolName: toolName,
      });
      console.log("Success!");
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
