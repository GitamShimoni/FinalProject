import React, { useState } from "react";
import "./ContractorNewRowCancelBtn.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import './Dialog.css'

function DeleteContractorBtn({ handleDeleteContractor }) {
  const [openDialog, setOpenDialog] = useState(false);
  const handleConfirmDelete = () => {
    handleDeleteContractor();
    setOpenDialog(false);
  };
  return (
    <div>
      <button
        className="ContractorNewRowCancelBtn-button"
        type="button"
        onClick={() => setOpenDialog(true)}
      >
        <span className="ContractorNewRowCancelBtn-button__text">מחק קבלן</span>
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
        sx={{direction:'rtl'}}
      >
        <DialogTitle id="alert-dialog-title">{"מחיקת קבלן"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: "black"}}  id="alert-dialog-description">
            האם אתה בטוח שאתה רוצה למחוק את הקבלן? לא תהיה דרך לשחזר
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

export default DeleteContractorBtn;
