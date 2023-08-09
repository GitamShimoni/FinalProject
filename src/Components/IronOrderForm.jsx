import React from "react";
import Host from "../utils/routes";
import axios from "axios";
import "./ProductOrderForm.css";
import { ProjectContext } from "../Contexts/ProjectContext";
import { useContext, useState } from "react";
import UploadWidget from "./UploadWidget";
import { ToastContainer, toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function IronOrderForm({ onClose }) {
  const { ironOrders, setIronOrders } = useContext(ProjectContext);
  const [image, setImage] = useState("");
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in 'yyyy-mm-dd' format
  console.log(image, "This is the image uploaded");
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const ironName = e.target[0].value;
    const dateOfOrder = e.target[1].value || currentDate; // Use current date if not selected
    const requestedArrivalDate = e.target[2].value;
    const requestedQuantity = e.target[3].value;
    const unit = e.target[4].value;
    const supplier = e.target[5].value;
    const minQuantity = e.target[6].value;

    try {
      const data = await axios
        .post(`${Host}/ironOrder/createIronOrder`, {
          ordersId: "64c6496edd068b2c46962f28",
          ironName: ironName,
          unit: unit,
          dateOfOrder: dateOfOrder,
          requestedArrivalDate: requestedArrivalDate,
          requestedQuantity: requestedQuantity,
          supplier: supplier,
          status: "pending",
          minQuantity: minQuantity,
          receiptSrc: image,
        })
        .then(({ data }) => {
          setIronOrders(data);
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
        });
      onClose();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = () => {
    onClose();
  };
  console.log(image, "This is the image from that form");
  return (
    <div className="update-user-modal">
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
      <div className="order-product-modal-content">
        <span className="update-user-modal-close-button" onClick={handleClose}>
          &times;
        </span>
        <form onSubmit={handleSubmitForm} id="Product-Order-Form">
          <h2>צור הזמנת ברזל חדשה</h2>
          <h2 className="ProductOrderForm-form-title">:שם המוצר</h2>
          <input
            required
            type="text"
            className="product-name ProductOrderForm-input"
            placeholder="שם המוצר"
          />
          <h2 className="ProductOrderForm-form-title">:תאריך ביצוע ההזמנה</h2>
          <input
            type="date"
            defaultValue={currentDate}
            pattern="\d{4}-\d{2}-\d{2}"
            className="date-Of-order ProductOrderForm-input"
          />
          <h2 className="ProductOrderForm-form-title">:תאריך אספקה מבוקש</h2>
          <input
            required
            type="date"
            pattern="\d{4}-\d{2}-\d{2}"
            className="date-Of-order ProductOrderForm-input"
          />
          <h2 className="ProductOrderForm-form-title">:כמות מבוקשת</h2>
          <input
            required
            type="number"
            className="quantity ProductOrderForm-input"
            placeholder="כמות מבוקשת"
          />

          <h2 className="ProductOrderForm-form-title">:יחידות</h2>
          <input
            required
            type="text"
            className="unit ProductOrderForm-input"
            placeholder="'יח"
          />
          <h2 className="ProductOrderForm-form-title">:ספק</h2>
          <input
            required
            type="text"
            className="unit ProductOrderForm-input"
            placeholder="ספק"
          />
          <h2 className="ProductOrderForm-form-title">:כמות מינימאלית</h2>
          <input
            required
            type="number"
            className="unit ProductOrderForm-input"
            placeholder="כמות מינימאלית"
          />
          <UploadWidget image={image} setImage={setImage} />
          {image != "" && (
            <div id="uploaded-image-container">
              <img id="uploaded-image" src={image} alt="" />
              <button
                id="delete-uploaded-image-button"
                onClick={() => setImage("")}
              >
                X
              </button>
            </div>
          )}
          <button
            onClick={() => handleSubmitForm}
            className="product-order-submit-btn"
            type="submit"
          >
            הזמן
          </button>
        </form>
      </div>
    </div>
  );
}

export default IronOrderForm;
