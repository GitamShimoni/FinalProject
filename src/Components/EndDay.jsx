import React, { useState, useEffect } from "react";
import axios from "axios";
import EndDayForm from "./EndDayForm";
import EndDayFormButton from "./EndDayFormButton";
import "./EndDay.css";
import EndDayPerContractor from "./EndDayPerContractor";

const EndDay = () => {
  const [contractors, setContractors] = useState([]);

  useEffect(() => {
    axios
      .post(
        `http://localhost:5000/contractor/getAllContractor`,
        {},
        {
          headers: { projectId: "64bfb6686d6efc963d2855f2" },
        }
      )
      .then(({ data }) => {
        setContractors(data.contractors);
        console.log(data.contractors, "This is the contractors");
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(contractors, "THIS IS THE CONTRACTORS");

console.log(contractors);
  return (
    <div className="end-day-container">
      {contractors?.map((contractor, index) => (
        <div key={index} className="contractor-form-container">
          <h3 id="contractor-name">{contractor.name}</h3>
          <EndDayPerContractor contractor={contractor}/>
        </div>
      ))}
    </div>
  );
};

export default EndDay;



