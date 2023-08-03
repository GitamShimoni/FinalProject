import { useEffect, useState } from "react";
import "./IronOrder.css";
import axios from "axios";
import Host from "../utils/routes";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
const IronOrder = ({ order, index }) => {
  const { productOrders, setProductOrders } = useContext(ProjectContext);
  const [changeStatus, setChangeStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
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
      if (
        confirm("האם לשנות את הסטטוס ל-`הגיע`? אין אפשרות לשנות זאת בחזרה.")
      ) {
        try {
          await axios
            .patch(`${Host}/productOrder/updateProductOrder`, {
              productOrderId: order._id,
              changeStatus,
            })
            .then(({ data }) => {
              setOrderStatus(changeStatus);
              handleAddProduct();
            });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      //NEED TO ADD A POP UP THAT ALERTS ACCEPTED OR DECLINED
      try {
        await axios
          .patch(`${Host}/productOrder/updateProductOrder`, {
            productOrderId: order._id,
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
          {orderStatus != "arrived" && (
            <button
              onClick={() => handleUpdateOrderStatus()}
              className="ironorder-table-option-button"
            >
              הגדר
            </button>
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
                  : "נדחה"}
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
        <div className="ironorder-table-part">{`${order?.requestedQuantity}`}</div>
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
