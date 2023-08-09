import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Host from "../utils/routes";
import EndDayMaterialTableRow from "./EndDayMaterialTableRow";
import "./EndDayTable.css";
function EndDayAllMaterialTable({ allMaterialsUsed }) {
  return (
    <div className="EndDayTable-container">
      <h2>שימוש יומי בחומרים</h2>
      <div className="inventory-table">
        <div className="inventory-tr">
          <div className="contractor-row-info-div">מוצר</div>
          <div className="contractor-row-info-div">
            <h3>יחידות</h3>
          </div>
          <div className="contractor-row-info-div">
            <h3>כמות</h3>
          </div>
        </div>
        {allMaterialsUsed?.map((product, index) => {
          return (
            <EndDayMaterialTableRow
              key={index}
              index={index}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
}

export default EndDayAllMaterialTable;
