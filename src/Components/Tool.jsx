import ReturnToolButton from "./ReturnToolButton";
import { useState } from "react";
import "./Tool.css";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
import { ToastContainer, toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Dialog.css";

const Tool = ({ tool, index }) => {
  const { tools, setTools } = useContext(ProjectContext);
  const [loanButton, setLoanButton] = useState(false);
  const [signedButton, setSignedButton] = useState(false);
  const [signedName, setSignedName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

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
          .patch(`${Host}/tools/updateToolTaken`, {
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
        toast.success("כלי הושאל בהצלחה", {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
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
    setOpenDialog(false);
    {
      console.log(tool._id, "This is the tool id");
      try {
        await axios.delete(`${Host}/tools/deleteTool`, {
          data: {
            toolId: tool._id,
          },
        });
        const newArr = [...tools].filter(
          (obj, localindex) => index != localindex
        );
        setTools(newArr);
        toast.success("כלי נמחק", {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (err) {
        console.log(err);
        toast.error("לא ניתן למחוק את הכלי ", {
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
    }
  };
  const handleConfirmDelete = () => {
    handleDeleteTool();
    setOpenDialog(false);
  };
  return (
    <div className="project-table-row">
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
        theme="dark"
      />
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
              onClick={() => setOpenDialog(true)}
              className="tool-table-x-button"
            >
              X
            </button>
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              id="dialog-container"
              sx={{ direction: "rtl" }}
            >
              <DialogTitle id="alert-dialog-title">מחיקת כלי</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{color: "black"}} id="alert-dialog-description">
                   האם אתה בטוח שאתה רוצה למחוק את הכלי הזה? לא תהיה דרך לשחזר אותו
                </DialogContentText>
              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <button className="dialog-btn" onClick={() => setOpenDialog(false)}>ביטול</button>
                <button className="dialog-btn" id="dialog-approved-btn" onClick={handleConfirmDelete} autoFocus>
                  אישור
                </button>
              </DialogActions>
            </Dialog>
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
