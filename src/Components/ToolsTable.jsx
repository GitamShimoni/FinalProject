import { useEffect, useState } from "react";
import axios from "axios";
import Tool from "./Tool";
import "./ToolsTable.css";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
import Loader from "./Loader";
const ToolsTable = () => {
  const { tools, setTools } = useContext(ProjectContext);
  // const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .post(`${Host}/tools/getAllTools`, {
        inventoryId: localStorage.getItem("inventoryId"),
      })
      .then(({ data }) => {
        setTools(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(tools);
  // if (loading) {
  //   return <Loader />;
  // }
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
      {tools?.map((tool, index) => {
        return <Tool key={index} tool={tool} index={index} />;
      })}
    </div>
  );
};

export default ToolsTable;
