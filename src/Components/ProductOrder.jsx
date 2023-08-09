import { useEffect, useState } from "react";
import "./ProductOrder.css";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import { ToastContainer, toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Dialog.css";

import Host from "../utils/routes";

const ProductOrder = ({ order, index }) => {
  const { productOrders, setProductOrders } = useContext(ProjectContext);
  const [changeStatus, setChangeStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  console.log(order, "This is the order");
  const handleAddProduct = async () => {
    try {
      await axios
        .post(`${Host}/product/create`, {
          inventoryId: localStorage.getItem("inventoryId"),
          name: order.productName,
          unit: order.unit,
          quantity: order.quantity,
          minQuantity: minQuantity,
          isIron: false,
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
      {
        try {
          openDialog(false)
          await axios
            .patch(`${Host}/productOrder/updateProductOrder`, {
              productOrderId: order._id,
              changeStatus,
            })
            .then(({ data }) => {
              setOrderStatus(changeStatus);
              handleAddProduct();
              toast.success("  ההזמנה עודכנה בהצלחה!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              })
            });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      //NEED TO ADD A POP UP THAT ALERTS ACCEPTED OR DECLINED
      try {
        setOpenDialog(false);
        await axios
          .patch(`${Host}/productOrder/updateProductOrder`, {
            productOrderId: order._id,
            changeStatus,
          })
          .then(({ data }) => {
            setOrderStatus(changeStatus);
          });
          toast.success("  ההזמנה עודכנה בהצלחה!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    setOrderStatus(order?.status);
  }, [order]);
  console.log(order, "dasdsadsa");
  const handleConfirmDelete = () => {
    handleUpdateOrderStatus();
    setOpenDialog(false);
  };

  return (
    <div className="project-productorder-table-row">
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
      <div
        className={
          index % 2 == 0 ? "productorder-tr-zugi" : "productorder-tr-notzugi"
        }
      >
        <div className="productorder-table-leftpart">
          {order?.supplier ? `${order?.supplier}` : `צריך להזין ספק`}
        </div>

        <div className="productorder-table-part">
          {orderStatus != "arrived" && (
            <button
              onClick={() => setOpenDialog(true)}
              className="productorder-table-option-button"
            >
              הגדר
            </button>
          )}
          {orderStatus != "arrived" ? (
            <select
              onChange={(e) => setChangeStatus(e.target.value)}
              className={`productorder-table-select ${
                orderStatus === "pending"
                  ? "productorder-option-pending"
                  : orderStatus === "arrived"
                  ? "productorder-option-arrived"
                  : "productorder-option-declined"
              }`}
              name=""
              id=""
            >
              <option disabled selected hidden value="">
                {orderStatus == "pending"
                  ? "ממתין"
                  : orderStatus == "arrived"
                  ? "הגיע"
                  : "נדחה"}
              </option>
              <option
                className="productorder-table-option"
                value="arrived"
              >{`הגיע`}</option>
              <option
                className="productorder-table-option"
                value="pending"
              >{`ממתין`}</option>
              <option
                className="productorder-table-option"
                value="declined"
              >{`בוטל`}</option>
            </select>
          ) : (
            <h2 className="productorder-table-arrived-header">{"הגיע"}</h2>
          )}
          {/* {order?.status == "pending" ? "ממתין" : "הגיע"} */}
        </div>
        <div className="productorder-table-part">{`${
          order?.dateOfOrder != undefined ? formatDate(order?.dateOfOrder) : ""
        }`}</div>
        <div className="productorder-table-part">{`${order?.quantity}`}</div>
        <div className="productorder-table-toolpart">{`${order?.productName}`}</div>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="dialog-container"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">עדכון הזמנה </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: "black" }}
            id="alert-dialog-description"
          >
            האם אתה בטוח שברצונך לעדכן את ההזמנה ? לא תהיה דרך לעדכן אותה שוב
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

export default ProductOrder;

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
