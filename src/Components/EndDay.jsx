import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Host from "../utils/routes";

import "./EndDay.css";
import EndDayPerContractor from "./EndDayPerContractor";
import { ProjectContext } from "../Contexts/ProjectContext";

const EndDay = () => {
  const [contractors, setContractors] = useState([]);
  const [filledContractors, setFilledContractors] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  
  useEffect(() => {
    axios
      .post(
        `${Host}/contractor/getAllContractor`,
        {},
        {
          headers: { projectId: localStorage.getItem("selectedProjectId") },
        }
      )
      .then(({ data }) => {
        setContractors(data.contractors);
        console.log(data.contractors, "This is the contractors");
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(filledContractors, "THIS IS THE FIELD CONTRACTORS");
  console.log(allMaterials, "THIS IS THE ALL MATERIALS");
  return (
    <div className="end-day-container">
      {contractors?.map((contractor, index) => (
        <div key={index} className="contractor-form-container">
          <h3 id="contractor-name">{contractor.name}</h3>
          <EndDayPerContractor  contractor={contractor} filledContractors={filledContractors} setFilledContractors={setFilledContractors}
          allMaterials={allMaterials} setAllMaterials={setAllMaterials} />
        </div>
      ))}
    </div>
  );
};

export default EndDay;
