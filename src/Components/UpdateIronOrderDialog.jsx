import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateIronOrderDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        הגדר
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>אישור הגעת הזמנה</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            .יש להוסיף את תאריך הגעת ההזמנה, ואת הכמות שהגיעה
          </DialogContentText>
          <div className="update-iron-order-dialog-dateinput-div">
            <h2>תאריך הגעה</h2>
            <input className="update-iron-order-dialog-dateinput" type="date" />
            <h2>כמות שהגיעה</h2>
            <input
              className="update-iron-order-dialog-quantityinput"
              type="number"
              placeholder="כמות שהגיעה"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button onClick={handleClose}>אישור</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
