import { useEffect, useState } from "react";
import axios from "axios";
import "./ContractorsTable.css";
import Host from "../utils/routes";
import ContractorRow from "./ContractorRow";
import AddServiceBtn from "./AddServiceBtn";
import ContractorNewRow from "./ContractorNewRow";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import DeleteContractorBtn from "./DeleteContractorBtn";

function ContractorsTable({ contractor }) {
  const { contractorsArr, setContractorsArr } = useContext(ProjectContext);
  const [servicesArr, setServicesArr] = useState([]);
  const [addNewService, setAddNewService] = useState(false);

  async function handleDeleteContractor() {
    if (
      confirm(
        `האם אתה בטוח שאתה רוצה למחוק את ${contractor.name} מרשימת הקבלנים? לא תהיה דרך לשחזר`
      )
    ) {
      await axios
        .post(`${Host}/contractor/delete`, {
          contractorId: contractor._id,
        })
        .then(({ data }) => {
          let newArr = [...contractorsArr];
          newArr = newArr.filter((item) => item._id != contractor._id);
          setContractorsArr(newArr);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    axios
      .post(`${Host}/contractor/getAllServices`, {
        contractorId: contractor._id,
      })
      .then(({ data }) => {
        setServicesArr(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="project-table">
        <div className="contractor-table-name">
          <h2>{contractor?.name}</h2>
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
            <span key={index}>
              <ContractorRow
                index={index}
                service={service}
                setServicesArr={setServicesArr}
              />
            </span>
          );
        })}
        {addNewService ? (
          <ContractorNewRow
            index={servicesArr.length}
            setAddNewService={setAddNewService}
            setServicesArr={setServicesArr}
            contractorId={contractor?._id}
          />
        ) : (
          <div className="contractTable-add-service-btn">
            <AddServiceBtn setAddNewService={setAddNewService} />
          </div>
        )}
      </div>
      <div className="contractTable-delete-contractor-btn-div">
        <DeleteContractorBtn handleDeleteContractor={handleDeleteContractor} />
      </div>
    </div>
  );
}

export default ContractorsTable;
