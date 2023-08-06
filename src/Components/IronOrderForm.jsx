import React from "react";
import Host from "../utils/routes";
import axios from "axios";
import "./ProductOrderForm.css";
import { ProjectContext } from "../Contexts/ProjectContext";
import { useContext, useState } from "react";
import UploadWidget from "./UploadWidget";

function IronOrderForm() {
  const { ironOrders, setIronOrders } = useContext(ProjectContext);
  const [image, setImage] = useState("hi");
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
        })
        .then(({ data }) => {
          setIronOrders(data);
        });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(image, "This is the image from that form");
  return (
    <div>
      <div id="ProductOrderForm-form-container">
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
          <UploadWidget image={image} setImage={setImage} />
          <button className="product-order-submit-btn" type="submit">
            הזמן
          </button>
        </form>
      </div>
    </div>
  );
}

export default IronOrderForm;
