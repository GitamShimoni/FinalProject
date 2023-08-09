import React from "react";
import "./EndDayTableRow.css"
function EndDayTableRow({ index, service }) {
  return (
    <div
      className={
        index % 2 == 0
          ? "EndDayTableRow-row-container EndDayTableRow-tr-zugi"
          : "EndDayTableRow-row-container EndDayTableRow-tr-notzugi"
      }
    >
      <div className="EndDayTableRow-row-info-div border-left">
          <h3>{service?.sectionName}</h3>
      </div>
      <div className="EndDayTableRow-row-info-div border-left">
        <h3>{service?.section}</h3>
      </div>
      <div className="EndDayTableRow-row-info-div border-left">
        <h3>{service?.unit}</h3>
      </div>
      <div className="EndDayTableRow-row-info-div border-left">
        <h3>{service?.status}</h3>
      </div>
      <div className="contractor-row-info-div ">
        <h3>{service?.WhatWasDone}</h3>
      </div>
    </div>
  );
}

export default EndDayTableRow;
