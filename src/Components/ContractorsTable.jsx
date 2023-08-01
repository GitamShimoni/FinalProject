import { useEffect, useState } from "react";
import axios from "axios";
import "./ContractorsTable.css";
import Host from "../utils/routes";
import ContractorRow from "./ContractorRow";
import AddServiceBtn from "./AddServiceBtn";

function ContractorsTable({ contractor }) {
  const [contractorState, setContractorState] = useState(contractor);
  const [servicesArr, setServicesArr] = useState([]);

  useEffect(() => {
    axios
      .post(`${Host}/contractor/getAllServices`, {
        contractorId: contractorState._id,
      })
      .then(({ data }) => {
        setServicesArr(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="project-table">
      <div className="contractor-table-name">
        <h2>{contractorState.name}</h2>
      </div>
      <div className="contractor-tr">
        <div className="contractor-row-info-div">{`מחיר`}</div>
        <div className="contractor-row-info-div">
          <h3>יחידה</h3>
        </div>
        <div className="contractor-row-info-div">
          <h3>מס' סעיף</h3>
        </div>
        <div className="contractor-row-info-div service-name-table-title">
          <h3>שם השירות</h3>
        </div>
      </div>
      {servicesArr?.map((service, index) => {
        return (
          <ContractorRow
            key={index}
            index={index}
            service={service}
            setServicesArr={setServicesArr}
          />
        );
      })}
      <div className="contractTable-add-service-btn">
        <AddServiceBtn />
      </div>
    </div>
  );
}

export default ContractorsTable;
