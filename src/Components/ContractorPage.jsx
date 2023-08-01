import { useEffect, useState } from "react";
import axios from "axios";
import "./ContractorsTable.css";
import { useContext } from "react";
import Host from "../utils/routes";
import ContractorsTable from "./ContractorsTable"

function ContractorPage() {
  const [contractorsArr, setContractorsArr] = useState([]);

  useEffect(() => {
    // const projectId = "64bfb6686d6efc963d2855f2";
    axios
      .post(
        `${Host}/contractor/getAllContractor`,
        {},
        {
          headers: { projectId: "64bfb6686d6efc963d2855f2" },
        }
      )
      .then(({ data }) => {
        setContractorsArr(data.contractors);        
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {contractorsArr?.map((contractor,index)=><ContractorsTable key={index} contractor={contractor}/>)}
    </div>
  )
}

export default ContractorPage
