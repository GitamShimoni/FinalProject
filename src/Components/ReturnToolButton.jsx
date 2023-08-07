import { useState } from "react";
import "./ReturnToolButton.css";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
import { ToastContainer, toast } from "react-toastify";

const ReturnToolButton = ({ toolId, toolName, index }) => {
  const { tools, setTools } = useContext(ProjectContext);
  const [clicked, setClicked] = useState(false);
  const handleReturnTool = async () => {
    console.log("Got to the function");
    try {
      await axios
        .put(`${Host}/tools/updateTool`, {
          toolId: toolId,
          toolName: toolName,
        })
        .then(({ data }) => {
          console.log(data, "This is the data from the return");
          const newArr = [...tools];
          newArr[index] = data;
          setTools(newArr);
        });
      toast.success("כלי הוחזר בהצלחה", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
      toast.error("לא ניתן להשאיל את הכלי ", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="returnTool-button-container">
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
