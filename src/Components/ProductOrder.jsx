import { useState } from "react";
import "./ProductOrder.css";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
const ProductOrder = ({ order, index }) => {
  const { orders, setOrders } = useContext(ProjectContext);

  const handleUpdateTool = async () => {
    try {
      await axios
        .patch("http://localhost:5000/tools/updateToolTaken", {
          toolId: tool._id,
          toolName: tool.toolName,
          takenBy: signedName,
          signed: signedButton,
        })
        .then(({ data }) => {
          console.log(data, "This is the updated tool");
          const newArr = [...tools];
          newArr[index] = data;
          setLoanButton(false);
          setTools(newArr);
        });
      console.log(order, "This is the tools from tool");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="project-productorder-table-row">
      <div
        className={
          index % 2 == 0 ? "productorder-tr-zugi" : "productorder-tr-notzugi"
        }
      >
        <div className="productorder-table-leftpart">{`צריך להזין ספק`}</div>

        <div className="productorder-table-part">
          {order?.status == "pending" ? "ממתין" : "הגיע"}
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
  const dateSegments = dateString.split("T");
  const datePart = dateSegments[0].split("-").reverse().join(".");
  const timePart = dateSegments[1].split(":").slice(0, 2).join(":");
  return `${datePart} - ${timePart}`;
}
