import React from "react";
import EndDayMaterialTableRow from "./EndDayMaterialTableRow";
import "./EndDayTable.css";

function EndDayMaterialTable({ contractor }) {
  return (
    contractor?.materialsUsed.length > 0 && (
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
          {contractor.materialsUsed.map((product, index) => (
            <EndDayMaterialTableRow key={index} index={index} product={product} />
          ))}
        </div>
      </div>
    )
  );
}

export default EndDayMaterialTable;
