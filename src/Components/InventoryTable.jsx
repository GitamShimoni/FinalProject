import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Host from "../utils/routes";
import { ProjectContext } from "../Contexts/ProjectContext";
import "./InventoryTable.css";
import InventoryTableRow from "./InventoryTableRow";

const InventoryTable = ({ inventoryArr }) => {
  const [products, setProducts] = useState([]);

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
        <div className="contractor-row-info-div service-name-table-title">
          <h3>כמות מינימלית</h3>
        </div>
      </div>
      {/* {inventoryArr.map((product, index) => (
        <div key={index} className="product-row">
          <div className="product-info">{product.name}</div>
          <div className="product-info">{product.unit}</div>
          <div className="product-info">{product.quantity}</div>
          <div className="product-info">{product.minQuantity}</div>
        </div>
      ))} */}
      {inventoryArr?.map((product, index) => {
        return (
          <span key={index}>
            <InventoryTableRow index={index} product={product} />
          </span>
        );
      })}
    </div>
  );
};

export default InventoryTable;
