import ReturnToolButton from "./ReturnToolButton";
import { useState } from "react";
import "./Tool.css";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";

const Tool = ({ tool, index }) => {
  const { tools, setTools } = useContext(ProjectContext);
  const [loanButton, setLoanButton] = useState(false);
  const [signedButton, setSignedButton] = useState(false);
  const [signedName, setSignedName] = useState("");

  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const datePart = dateObj.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const timePart = dateObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart} - ${timePart}`;
  }

  const handleUpdateTool = async () => {
    if (signedName != "") {
      try {
        await axios
          .patch("http://localhost:5000/tools/updateToolTaken", {
            toolId: tool._id,
            toolName: tool.toolName,
            takenBy: signedName,
            signed: signedButton,
          })
          .then(({ data }) => {
            console.log(data, "This is the updated tool");
            const newArr = [...tools];
            newArr[index] = data;
            setLoanButton(false);
            setTools(newArr);
          });
        console.log(tools, "This is the tools from tool");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("לא ניתן להלוות כלי ללא מילוי שם");
    }
  };

  const handleDeleteTool = async () => {
    if (confirm("האם אתה בטוח רוצה למחוק? אין דרך לשחזר.")) {
      console.log(tool._id, "This is the tool id");
      try {
        await axios.delete("http://localhost:5000/tools/deleteTool", {
          data: {
            toolId: tool._id,
          },
        });
        const newArr = [...tools].filter(
          (obj, localindex) => index != localindex
        );
        setTools(newArr);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="project-table-row">
      <div
        className={
          tool?.takenBy == undefined
            ? index % 2 == 0
              ? "tool-tr-zugi"
              : "tool-tr-notzugi"
            : index % 2 == 0
            ? "tool-tr-zugi-taken"
            : "tool-tr-notzugi-taken"
        }
      >
        <div className="tool-table-leftpart">
          {`${tool?.date != undefined ? formatDate(tool?.date) : ""}`}
          {loanButton && (
            <button
              onClick={() => handleUpdateTool()}
              className="tool-addloan-submit-button"
            >
              אישור
            </button>
          )}
        </div>
        <div className="tool-table-part">
          {tool?.signed == true ? `כן` : tool?.signed == undefined ? "" : "לא"}
          {loanButton && (
            <>
              <button
                className={
                  signedButton ? "tool-signed-button" : "tool-unsigned-button"
                }
                onClick={() => setSignedButton(!signedButton)}
              >
                {signedButton ? `חתום` : `לא חתום`}
              </button>
            </>
          )}
        </div>
        <div className="tool-table-part">
          {tool?.takenBy != undefined ? (
            `${tool?.takenBy}`
          ) : (
            <>
              {loanButton && (
                <input
                  onChange={(e) => setSignedName(e.target.value)}
                  className="add-toolloan-name-input"
                  placeholder="שם"
                ></input>
              )}

              <button
                onClick={() => setLoanButton(!loanButton)}
                className="add-tool-loan-button"
              >
                {loanButton ? "ביטול" : "הוסף חתימה"}
              </button>
            </>
          )}
        </div>
        <div className="tool-table-toolpart">
          <div className="tool-table-deletetool-div">
            {`${tool?.toolName}`}
            <button
              onClick={() => handleDeleteTool()}
              className="tool-table-x-button"
            >
              X
            </button>
          </div>
          {tool?.takenBy?.length > 0 && (
            <ReturnToolButton
              toolId={tool?._id}
              toolName={tool?.toolName}
              index={index}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tool;
