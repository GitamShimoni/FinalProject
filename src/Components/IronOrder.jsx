import { useEffect, useState } from "react";
import "./IronOrder.css";
import axios from "axios";
import Host from "../utils/routes";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const IronOrder = ({ order, index }) => {
  const { ironOrders, setIronOrders } = useContext(ProjectContext);
  const [changeStatus, setChangeStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [arrivedQuantity, setArrivedQuantity] = useState(0);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const inventoryId = "64bfb6686d6efc963d2855ec";

  console.log(order, "This is the order!!!!!!!!!!!!!!!!!!!!!!!!!");
  const handleAddProduct = async () => {
    try {
      await axios
        .post(`${Host}/product/create`, {
          inventoryId: inventoryId,
          name: order.productName,
          unit: order.unit,
          quantity: order.quantity,
          minQuantity: 0,
          isIron: true,
          orderId: order._id,
        })
        .then(({ data }) => {
          //   setOrderStatus(changeStatus);
          console.log("Success!", data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateOrderStatus = async () => {
    if (changeStatus == "arrived") {
      try {
        await axios
          .patch(`${Host}/ironOrder/updateIronOrder`, {
            IronOrderId: order._id,
            changeStatus,
            arrivalDate,
            arrivedQuantity,
          })
          .then(({ data }) => {
            setOrderStatus(changeStatus);
            handleAddProduct();
            handleClose();
            order.arrivalDate = arrivalDate;
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      //NEED TO ADD A POP UP THAT ALERTS ACCEPTED OR DECLINED
      try {
        await axios
          .patch(`${Host}/ironOrder/updateIronOrder`, {
            IronOrderId: order._id,
            changeStatus,
          })
          .then(({ data }) => {
            setOrderStatus(changeStatus);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    setOrderStatus(order?.status);
  }, [order]);

  return (
    <div className="project-ironorder-table-row">
      <div
        className={
          index % 2 == 0 ? "ironorder-tr-zugi" : "ironorder-tr-notzugi"
        }
      >
        <div className="ironorder-table-leftpart">
          {order?.imcSrc ? `${order?.imgSrc}` : `אין תמונה`}
        </div>
        <div className="ironorder-table-part">
          {order?.supplier ? `${order?.supplier}` : `צריך להזין ספק`}
        </div>

        <div className="ironorder-table-part">
          {orderStatus != "arrived" && changeStatus != "arrived" ? (
            <button
              onClick={() => handleUpdateOrderStatus()}
              className="ironorder-table-option-button"
            >
              הגדר
            </button>
          ) : (
            <div>
              {orderStatus != "arrived" && (
                <button
                  className="open-dialog-button"
                  onClick={handleClickOpen}
                >
                  הגדר
                </button>
              )}
              <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                  <DialogContentText>
                    .יש להוסיף את תאריך הגעת ההזמנה, ואת הכמות שהגיעה
                  </DialogContentText>
                  <div className="update-iron-order-dialog-dateinput-div">
                    <h2>תאריך הגעה</h2>
                    <input
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="update-iron-order-dialog-dateinput"
                      type="date"
                    />
                    <h2>כמות שהגיעה</h2>
                    <input
                      onChange={(e) => setArrivedQuantity(e.target.value)}
                      className="update-iron-order-dialog-quantityinput"
                      type="number"
                      placeholder="כמות שהגיעה"
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>ביטול</Button>
                  <Button onClick={() => handleUpdateOrderStatus()}>
                    אישור
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
          {orderStatus != "arrived" ? (
            <select
              onChange={(e) => setChangeStatus(e.target.value)}
              className={`ironorder-table-select ${
                orderStatus === "pending"
                  ? "ironorder-option-pending"
                  : orderStatus === "arrived"
                  ? "ironorder-option-arrived"
                  : "ironorder-option-declined"
              }`}
              name=""
              id=""
            >
              <option disabled selected hidden value="">
                {orderStatus == "pending"
                  ? "ממתין"
                  : orderStatus == "arrived"
                  ? "הגיע"
                  : "בוטל"}
              </option>
              <option
                className="ironorder-table-option"
                value="arrived"
              >{`הגיע`}</option>
              <option
                className="ironorder-table-option"
                value="pending"
              >{`ממתין`}</option>
              <option
                className="ironorder-table-option"
                value="declined"
              >{`בוטל`}</option>
            </select>
          ) : (
            <h2 className="ironorder-table-arrived-header">{"הגיע"}</h2>
          )}
        </div>
        <div className="ironorder-table-datespart">
          <h3 className="ironorder-dates-headerstop">{`${
            order?.requestedArrivalDate != undefined ? "הוזמן" : ""
          }`}</h3>
          <h3 className="ironorder-dates-headers">{`${
            order?.requestedArrivalDate != undefined
              ? formatDate(order?.requestedArrivalDate)
              : ""
          }`}</h3>
          <h3 className="ironorder-dates-headerstop">{`${
            order?.arrivalDate != undefined ? "הגיע" : ""
          }`}</h3>
          <h3 className="ironorder-dates-headers">{`${
            order?.arrivalDate != undefined
              ? formatDate(order?.arrivalDate)
              : ""
          }`}</h3>
        </div>
        {/* <div className="ironorder-table-part">{`${order?.requestedQuantity}`}</div> */}
        <div className="ironorder-table-datespart">
          <h3 className="ironorder-dates-headerstop">{`${
            order?.requestedQuantity != undefined ? "הוזמן" : ""
          }`}</h3>
          <h3 className="ironorder-dates-headers">{`${
            order?.requestedQuantity != undefined
              ? order?.requestedQuantity
              : ""
          }`}</h3>
          <h3 className="ironorder-dates-headerstop">{`${
            order?.arrivedQuantity != undefined ? "הגיע" : ""
          }`}</h3>
          <h3 className="ironorder-dates-headers">{`${
            order?.arrivedQuantity != undefined ? order?.arrivedQuantity : ""
          }`}</h3>
        </div>
        <div className="ironorder-table-toolpart">{`${order?.ironName}`}</div>
      </div>
    </div>
  );
};

export default IronOrder;

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
