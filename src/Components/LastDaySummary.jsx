import React, { useState, useEffect } from "react";
import axios from "axios";
import Host from "../utils/routes";
import EndDayTableRow from "./EndDayTableRow";
import EndDayTable from "./EndDayTable";
import EndDayMaterialTable from "./EndDayMaterialTable";
import EndDayAllMaterialTable from "./EndDayAllMaterialTable";
import "./LastDaySummary.css";

function LastDaySummary() {
  const [lastDay, setLastDay] = useState({});

  useEffect(() => {
    axios
      .post(`${Host}/endDay/getLatestEndDay`, {
        projectId: localStorage.getItem("selectedProjectId"),
      })
      .then(({ data }) => {
        console.log(data);
        setLastDay(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function filterServicesWithWhatWasDone(services) {
    return services.filter(service => service.WhatWasDone && service.WhatWasDone.trim() !== "");
  }

  return (
    <div className="LastDaySummary-container">
      {lastDay.contractorsArr
        ?.filter(contractor => filterServicesWithWhatWasDone(contractor.services).length > 0)
        .map((contractor, index) => (
          <div className="LastDaySummary-table-section" key={index}>
            <EndDayTable contractor={contractor} />
            <EndDayMaterialTable contractor={contractor} />
          </div>
        ))}
        <EndDayAllMaterialTable allMaterialsUsed={lastDay?.allMaterialsUsed} />
    </div>
  );
}

export default LastDaySummary;
