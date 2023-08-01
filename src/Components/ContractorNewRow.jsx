import { useState } from "react";
import axios from "axios";
import "./ContractorRow.css";
import DeleteServiceButton from "./DeleteService";

function ContractorNewRow({ service, index, setServicesArr}) {
    return (
        <div
          className={
            index % 2 == 0
              ? "contractor-row-container contractor-tr-zugi"
              : "contractor-row-container contractor-tr-notzugi"
          }
        >
          <div className="contractor-row-info-div border-left">
            <div className="contractor-row-service-name-title"><input type="text" placeholder="שם השירות" /></div>

          </div>
          <div className="contractor-row-info-div border-left">
            <input type="number" placeholder="מס' סעיף"/>
          </div>
          <div className="contractor-row-info-div border-left">
            <input type="text" placeholder="יחידה" />
          </div>
          <div className="contractor-row-info-div ">
            <input type="number" placeholder="מחיר" />
          </div>
        </div>
      );
}

export default ContractorNewRow
