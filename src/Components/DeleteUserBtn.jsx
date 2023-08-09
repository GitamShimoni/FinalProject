import React, { useEffect, useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Dialog.css";

const DeleteUserBtn = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const token = localStorage.getItem("token");
  const deleteUser = async () => {
    setOpenDialog(false);
    try {
      await axios.post(`${Host}/users/deleteUser`, {token: token});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="delete-user-btn">
      <button type="button" onClick={() => deleteUser()}></button>
    </div>
  );
};
export default DeleteUserBtn;
