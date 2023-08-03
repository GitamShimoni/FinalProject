import { useState } from "react";
import axios from "axios";
import "./ContractorRow.css";
import DeleteServiceButton from "./DeleteService";

function ContractorRow({ service, index, setServicesArr}) {
  return (
    <div
      className={
        index % 2 == 0
          ? "contractor-row-container contractor-tr-zugi"
          : "contractor-row-container contractor-tr-notzugi"
      }
    >
     
      <div className="contractor-row-info-div border-left">
        <div className="contractor-row-service-name-title"><h3>{service?.sectionName}</h3></div>
        <div className="delete-service-btn"><DeleteServiceButton serviceId={service?._id} setServicesArr={setServicesArr}/></div>
      </div>
      <div className="contractor-row-info-div border-left">
        <h3>{service?.section}</h3>
      </div>
      <div className="contractor-row-info-div border-left">
        <h3>{service?.unit}</h3>
      </div>
      <div className="contractor-row-info-div ">
        <h3>{service?.price?.toLocaleString("en-US")} ₪</h3>
      </div>
    </div>
  );
}

export default ContractorRow;
