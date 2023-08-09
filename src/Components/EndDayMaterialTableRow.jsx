import React from "react";
import "./EndDayMaterialTableRow.css"
function EndDayMaterialTableRow({ index, product }) {
  return (
    <div
      className={
        index % 2 == 0
          ? "EndDayMaterialTableRow-row-container EndDayMaterialTableRow-tr-zugi"
          : "EndDayMaterialTableRow-row-container EndDayMaterialTableRow-tr-notzugi"
      }
    >
      <div className="EndDayMaterialTableRow-row-info-div border-left">
          <h3>{product?.name}</h3>
      </div>
      <div className="EndDayMaterialTableRow-row-info-div border-left">
        <h3>{product?.unit}</h3>
      </div>
    
      <div className="EndDayMaterialTableRow-row-info-div ">
        <h3>{product?.quantity}</h3>
      </div>
    </div>
  );
}

export default EndDayMaterialTableRow;
