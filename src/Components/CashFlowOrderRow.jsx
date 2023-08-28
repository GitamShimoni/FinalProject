import { useEffect, useState } from "react";
import "./ProductOrder.css";
import axios from "axios";
import Host from "../utils/routes";

function CashFlowOrderRow({ order, index }) {

  return (
    <div className="project-productorder-table-row">
      <div
        className={
          index % 2 == 0 ? "productorder-tr-zugi" : "productorder-tr-notzugi"
        }
      >
        <div className="productorder-table-leftpart">{`${order?.quantity}`}</div>
        <div className="productorder-table-toolpart">{`${order?.productName || order?.serviceName}`}</div>
        <div className="productorder-table-part">{`${order?.supplier || order?.contractorName}`}</div>
        <div className="productorder-table-toolpart">{`${order?.price}`}</div>
        <div className="productorder-table-part">{`${formatDate(order?.date)}`}</div>
      </div>
    </div>
  );
}

export default CashFlowOrderRow;

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const datePart = dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timePart = dateObj.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} - ${timePart}`;
}
