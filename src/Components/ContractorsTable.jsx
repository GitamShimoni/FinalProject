import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
const ContractorsTable = () => {
  const { contractors, setContractors } = useContext(ProjectContext);
  // const [contractors, setContractors] = useState([]);
  useEffect(() => {
    const projectId = "64bfb6686d6efc963d2855f2";
    axios
      .post(`${Host}/contractors/getAllcontractors`, {
        projectId,
      })
      .then(({ data }) => setContractors(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(contractors);
  return (
    <div className="project-table">
      <div className="project-tr">
        <div
          className="project-toprow-tr"
          id="project-topleft-td"
        >{`תאריך`}</div>
        <div className="project-toprow-tr">{`חתום`}</div>
        <div className="project-toprow-tr">{`נלקח ע"י`}</div>
        <div
          className="project-toprow-tr"
          id="project-topright-td"
        >{`כלי`}</div>
      </div>
    </div>
  );
};

export default ContractorsTable;