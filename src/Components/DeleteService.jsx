import React, { useState } from "react";
import "./DeleteService.css";
import axios from "axios";
import Host from "../utils/routes";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import './Dialog.css'

function DeleteService({ serviceId, setServicesArr }) {
  const [openDialog, setOpenDialog] = useState(false);

  async function handleDelete() {
    setOpenDialog(false);
    {
      await axios
        .post(`${Host}/contractor/deleteService`, { serviceId: serviceId })
        .then(({ data }) => {
          console.log(data);
          setServicesArr((prev) =>
            prev.filter((item) => item._id != serviceId)
          );
        })
        .catch((err) => console.log(err));
    }
  }
  const handleConfirmDelete = () => {
    handleDelete();
    setOpenDialog(false);
  };

  return (
    <div style={{display: "flex"}}>
      <button onClick={() => setOpenDialog(true)} className="btn">
        <svg
          viewBox="0 0 15 17.5"
          height="17.5"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            transform="translate(-2.5 -1.25)"
            d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
            id="Fill"
          ></path>
        </svg>
      </button>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="dialog-container"
        sx={{direction:'rtl'}}
      >
        <DialogTitle id="alert-dialog-title">מחיקת שירות</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: "black"}}  id="alert-dialog-description">
            האם אתה בטוח שאתה רוצה למחוק את השירות? לא תהיה דרך לשחזר אותו
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:10}}>
          <button className="dialog-btn" onClick={() => setOpenDialog(false)}>ביטול</button>
          <button className="dialog-btn" id="dialog-approved-btn" onClick={handleConfirmDelete} autoFocus>
            אישור
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteService;
