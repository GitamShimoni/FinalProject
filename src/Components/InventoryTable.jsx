import { useEffect, useState } from "react";
import axios from "axios";
import Tool from "./Tool";
import "./ToolsTable.css";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
const InventoryTable = () => {
  const { tools, setTools } = useContext(ProjectContext);
  // const [tools, setTools] = useState([]);
  useEffect(() => {
    const inventoryId = "64bfb6686d6efc963d2855ec";
    axios
      .post(`${Host}/tools/getAllTools`, {
        inventoryId,
      })
      .then(({ data }) => setTools(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(tools);
  return (
    <div className="project-table">
      <div className="project-tr">
        <div
          className="project-toprow-tr"
          id="project-topleft-td"
        >{`כמות מינימאלית`}</div>
        <div className="project-toprow-tr">{`כמות`}</div>
        <div className="project-toprow-tr">{`יחידת מידה`}</div>
        <div
          className="project-toprow-tr"
          id="project-topright-td"
        >{`מוצר`}</div>
      </div>
      {tools?.map((tool, index) => {
        return <Tool key={index} tool={tool} index={index} />;
      })}
    </div>
  );
};

export default InventoryTable;
