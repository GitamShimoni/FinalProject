import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Host from "../utils/routes";
import "./EndDay.css";
import EndDayPerContractor from "./EndDayPerContractor";
import { ProjectContext } from "../Contexts/ProjectContext";
import { useNavigate } from "react-router";


const EndDay = () => {
  const [contractors, setContractors] = useState([]);
  const [filledContractors, setFilledContractors] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [loading, setLoading] = useState(true)

const navigate = useNavigate()
  // async function handleSubmitEndDay() {
  //   const summary = {
  //     contractorsArr: contractors,
  //     allMaterialsUsed: allMaterials,
  //   };
  //   try {
  //     const newSummary = await axios.post(`${Host}/endDay/createEndDay`, {
  //       summary: summary,
  //       projectId: localStorage.getItem("selectedProjectId"),
  //     });
  //     console.log("Got into IF");
  //     handleRemoveItems();
  //     console.log(newSummary, "THIS IS THE NEW SUMMARY");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function handleRemoveItems() {
    try {
      const newInventory = await axios.post(
        `${Host}/endDay/removeLastDayMaterials`,
        {
          projectId: localStorage.getItem("selectedProjectId"),
          inventoryId: localStorage.getItem("inventoryId"),
        }
      );
      console.log(newInventory, "This is the updated inventory");
    } catch (err) {
      console.log(err);
    }
  }

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
        setTimeout(() => {
          setLoading(false);
        }, 1500);

      })
      .catch((err) => console.log(err));
  }, []);

  async function handleSubmitEndDay() {
    const summary = {
      contractorsArr: contractors,
      allMaterialsUsed: allMaterials,
    };
    try {
      const newSummary = await axios.post(`${Host}/endDay/createEndDay`, {
        summary: summary,
        projectId: localStorage.getItem("selectedProjectId"),
      });
      handleRemoveItems();
      navigate("/endDayTable")
      console.log(newSummary, "THIS IS THE NEW SUMMARY");
    } catch (err) {
      console.log(err);
    }
  }
  console.log(filledContractors, "THIS IS THE FIELD CONTRACTORS");
  console.log(allMaterials, "THIS IS THE ALL MATERIALS");
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="end-day-container">
      {contractors?.map((contractor, index) => (
        <div key={index} className="contractor-form-container">
          <EndDayPerContractor
            contractor={contractor}
            filledContractors={filledContractors}
            setFilledContractors={setFilledContractors}
            allMaterials={allMaterials}
            setAllMaterials={setAllMaterials}
          />
        </div>
      ))}
      <button id="send-endday-button" onClick={() => handleSubmitEndDay()}>
        שלח
      </button>
    </div>
  );
};

export default EndDay;
