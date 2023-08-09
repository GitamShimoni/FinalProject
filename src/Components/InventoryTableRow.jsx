import React from "react";

function InventoryTableRow({ index, product }) {
  return (
    <div
      className={
        index % 2 == 0
          ? "contractor-row-container contractor-tr-zugi"
          : "contractor-row-container contractor-tr-notzugi"
      }

      <div className="contractor-row-info-div border-left">
        <div className="contractor-row-service-name-title">
          <h3>{product?.name || product?.ironName}</h3>
        </div>
      </div>
      <div className="contractor-row-info-div border-left">
        <h3>{product?.unit}</h3>
      </div>
      <div className="contractor-row-info-div border-left">
        <h3
          className={
            product?.minQuantity >= product?.quantity &&
            "min-quantity-inventory"
          }
        >
          {product?.quantity || product?.arrivedQuantity}
        </h3>
      </div>
      <div className="contractor-row-info-div ">
        <h3>{product?.minQuantity}</h3>
      </div>
    </div>
  );
}

export default InventoryTableRow;
