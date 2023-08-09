import React, { useEffect,useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import './Dialog.css'

const DeleteUserBtn = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const deleteUser = async () => {
        setOpenDialog(false)
        try {
            await axios.delete(`${Host}/users/deleteUser`, {
                data: {
                    userId: user._id
                }
            })
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="delete-user-btn">
            <button onClick={() => deleteUser}></button>
        </div>
    )

}
export default DeleteUserBtn