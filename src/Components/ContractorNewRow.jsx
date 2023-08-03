import { useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import "./ContractorNewRow.css";
import DeleteServiceButton from "./DeleteService";
import ContractorNewRowCancelBtn from "./ContractorNewRowCancelBtn";
import ContractorNewRowSaveBtn from "./ContractorNewRowSaveBtn";

function ContractorNewRow({
  index,
  setServicesArr,
  contractorId,
  setAddNewService,
}) {
  const [serviceName, setServiceName] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [serviceUnit, setServiceUnit] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  // Function to handle input changes and update state accordingly
  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
  };

  const handleServiceNumberChange = (e) => {
    setServiceNumber(e.target.value);
  };

  const handleServiceUnitChange = (e) => {
    setServiceUnit(e.target.value);
  };

  const handleServicePriceChange = (e) => {
    setServicePrice(e.target.value);
  };

  async function handleSaveNewService() {
    if (
      serviceName != "" &&
      serviceNumber != "" &&
      serviceUnit != "" &&
      servicePrice != ""
    ) {
      await axios
        .post(`${Host}/contractor/add`, {
          contractorId: contractorId,
          section: serviceNumber,
          sectionName: serviceName,
          price: servicePrice,
          unit: serviceUnit,
        })
        .then(({ data }) => {
          setServicesArr((prev) => [...prev, data]);
          setAddNewService(false)
        })
        .catch((err) => console.log(err));
    } else {
      alert("אנא מלא את כל השדות לפני שאתה שומר שירות חדש");
    }
  }
  console.log(index);

  return (
    <div>
      <div
        className={
          index % 2 === 0
            ? "contractor-row-container contractor-tr-zugi"
            : "contractor-row-container contractor-tr-notzugi"
        }
      >
        <div className="contractor-row-info-div border-left">
          <div className="contractor-row-service-name-title">
            <input
              className="new-contractor-input"
              type="text"
              placeholder="שם השירות"
              value={serviceName}
              onChange={handleServiceNameChange} // Update state when the input changes
            />
          </div>
        </div>
        <div className="contractor-row-info-div border-left">
          <input
            className="new-contractor-input"
            type="number"
            placeholder="מס' סעיף"
            value={serviceNumber}
            onChange={handleServiceNumberChange} // Update state when the input changes
          />
        </div>
        <div className="contractor-row-info-div border-left">
          <input
            className="new-contractor-input"
            type="text"
            placeholder="יחידה"
            value={serviceUnit}
            onChange={handleServiceUnitChange} // Update state when the input changes
          />
        </div>
        <div className="contractor-row-info-div">
          <input
            className="new-contractor-input"
            type="number"
            placeholder="מחיר"
            value={servicePrice}
            onChange={handleServicePriceChange} // Update state when the input changes
          />
        </div>
      </div>
      <div className="contractor-new-row-save-and-cancel-div">
        <ContractorNewRowCancelBtn setAddNewService={setAddNewService} />
        <ContractorNewRowSaveBtn handleSaveNewService={handleSaveNewService} />
      </div>
    </div>
  );
}

export default ContractorNewRow;
