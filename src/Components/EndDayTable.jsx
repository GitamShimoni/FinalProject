import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Host from "../utils/routes";
import EndDayTableRow from "./EndDayTableRow";
import "./EndDayTable.css"
function EndDayTable({contractor}) {

  return (
    <div className="EndDayTable-container">
        <h2>{contractor.name}</h2>
      <div className="inventory-table">
        <div className="EndDayTable-tr">
          <div className="EndDayTable-row-info-div">שירות</div>
          <div className="EndDayTable-row-info-div">
            <h3>סעיף</h3>
          </div>
          <div className="EndDayTable-row-info-div">
            <h3>יחידות</h3>
          </div>
          <div className="EndDayTable-row-info-div">
            <h3>סטטוס</h3>
          </div>
          <div className="EndDayTable-row-info-div">
            <h3>מה נעשה</h3>
          </div>
        </div>
        {contractor?.services?.map((service, index) => {
          return (
            
              <EndDayTableRow key={index} index={index} service={service} />
            
          );
        })}
      </div>
    </div>
  );
}

export default EndDayTable;
