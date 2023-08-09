import React from "react";
import { useState, useEffect, useContext } from "react";
import "./EndDayForm.css";
import axios from "axios";
import Host from "../utils/routes";

function EndDayFormServiceRow({index, service}) {
    const [servicesArr, setServicesArr] = useState([...contractor.services]);

  const [status, setStatus] = useState([]);
  const [changes, setChanges] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [productSelected, setProductSelected] = useState("");

  const calculateTextareaHeight = (index) => {
    let content = changes[index];
    const lineHeight = 20;
    const lines = content?.split("\n").length;
    return lineHeight * lines;
  };

  
  return (
    <div
      className={
        index % 2 === 0
          ? "EndDayForm-service-div contractor-tr-zugi"
          : "EndDayForm-service-div contractor-tr-notzugi"
      }
    >
      <div className="EndDayForm-table-row-div">
        <h3>{service?.sectionName}</h3>
      </div>
      <div className="EndDayForm-table-row-div">
        <h3>סעיף {service?.section}</h3>
      </div>
      <div className="EndDayForm-table-row-div">
        {" "}
        <select
          className="EndDayForm-select"
          onChange={(e) => handleSetStatus(index, e.target.value)}
        >
          <option value="inProgress">{`בתהליך`}</option>
          <option value="finished">{`הסתיים`}</option>
          <option value="didntStart">{`טרם התחיל`}</option>
        </select>
      </div>
      <div className="EndDayForm-table-row-div">
        {" "}
        <textarea
          className="EndDayForm-textarea"
          onChange={(e) => handleSetChanges(index, e.target.value)}
          style={{ height: calculateTextareaHeight(index) }}
          placeholder="מה נעשה"
        />
      </div>
    </div>
  );
}

export default EndDayFormServiceRow;
