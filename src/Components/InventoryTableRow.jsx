import React from 'react'

function InventoryTableRow({index, setInventoryArr, product}) {
  return (
    <div
      className={
        index % 2 == 0
          ? "contractor-row-container contractor-tr-zugi"
          : "contractor-row-container contractor-tr-notzugi"
      }
    >
     
      <div className="contractor-row-info-div border-left">
        <div className="contractor-row-service-name-title"><h3>{product?.name}</h3></div>
      </div>
      <div className="contractor-row-info-div border-left">
        <h3>{product?.unit}</h3>
      </div>
      <div className="contractor-row-info-div border-left">
        <h3>{product?.quantity}</h3>
      </div>
      <div className="contractor-row-info-div ">
        <h3>{product?.minQuantity}</h3>
      </div>
    </div>
  )
}

export default InventoryTableRow
