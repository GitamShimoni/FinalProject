import React, { useEffect, useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import { ToastContainer, toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Dialog.css";

const DeleteUserBtn = ({ realId, users, setUsers, onClose }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const token = localStorage.getItem("token");
  const deleteUser = async () => {
    setOpenDialog(false);
    try {
      await axios.post(`${Host}/users/deleteUser`, {
        token: token,
        realId: realId,
      });
      const timestamp = new Date().getTime(); // Get current timestamp
      const updatedUsersResponse = await axios.get(`${Host}/users/getUsers?timestamp=${timestamp}`);
      setUsers(updatedUsersResponse.data);
      toast.success("  המשתמש הוסר בהצלחה!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("לא ניתן למחוק את המשתמש", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handleConfirmDelete = async () => {
    await deleteUser();
    setOpenDialog(false);
  };
  return (
    <div className="delete-user-btn">
      <ToastContainer
        position="top-center"
        autoClose={1500}
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
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <button
        style={{ background: "#e5000000", borderWidth: "2px" }}
        className="ContractorNewRowCancelBtn-button"
        type="button"
        onClick={() => setOpenDialog(true)}
      >
        <span
          style={{ color: "black" }}
          className="ContractorNewRowCancelBtn-button__text"
        >
          מחק משתמש
        </span>
        <span className="ContractorNewRowCancelBtn-button__icon">
          <svg
            className="ContractorNewRowCancelBtn-svg"
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title></title>
            <path
              d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "32px",
              }}
            />
            <line
              style={{
                stroke: "#fff",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
                strokeWidth: "32px",
              }}
              x1="80"
              x2="432"
              y1="112"
              y2="112"
            />
            <path
              d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "32px",
              }}
            />
            <line
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "32px",
              }}
              x1="256"
              x2="256"
              y1="176"
              y2="400"
            />
            <line
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "32px",
              }}
              x1="184"
              x2="192"
              y1="176"
              y2="400"
            />
            <line
              style={{
                fill: "none",
                stroke: "#fff",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "32px",
              }}
              x1="328"
              x2="320"
              y1="176"
              y2="400"
            />
          </svg>
        </span>
      </button>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="dialog-container"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">מחיקת משתמש</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: "black" }}
            id="alert-dialog-description"
          >
            האם אתה בטוח שאתה רוצה להסיר את המשתמש? לא תהיה דרך לשחזר אותו
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
          <button className="dialog-btn" onClick={() => setOpenDialog(false)}>
            ביטול
          </button>
          <button
            className="dialog-btn"
            id="dialog-approved-btn"
            onClick={handleConfirmDelete}
            autoFocus
          >
            אישור
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteUserBtn;
