import { useEffect, useState } from "react";
import "./ProductOrder.css";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";

import Host from "../utils/routes";

const ProductOrder = ({ order, index }) => {
  const { productOrders, setProductOrders } = useContext(ProjectContext);
  const [changeStatus, setChangeStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(true)

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
  console.log(order, "dasdsadsa");

  return (
    <div className="project-productorder-table-row">
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
              onClick={() => handleUpdateOrderStatus()}
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
