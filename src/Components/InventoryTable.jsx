import React, { useState, useEffect, useContext } from "react";
import "./InventoryTable.css";
import InventoryTableRow from "./InventoryTableRow";


const InventoryTable = ({inventoryArr}) => {
 

  return (
      <div className="inventory-table">
        <div className="inventory-tr">
          <div className="contractor-row-info-div">מוצר</div>
          <div className="contractor-row-info-div">
            <h3>יחידת מידה</h3>
          </div>
          <div className="contractor-row-info-div">
            <h3>כמות</h3>
          </div>
          <div className="contractor-row-info-div">
            <h3>כמות מינימלית</h3>
          </div>
        </div>
        {inventoryArr?.map((product, index) => {
          return (
            <span key={index}>
              <InventoryTableRow
                index={index}
                product={product}
              />
            </span>
          );
        })}
      </div>

  );
};

export default InventoryTable;
