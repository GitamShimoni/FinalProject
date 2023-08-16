import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Tool from "./Tool";
import "./ToolsTable.css";
import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";
import Host from "../utils/routes";
import Loader from "./Loader";
import { useDownloadExcel } from "react-export-table-to-excel";

const ToolsTable = () => {
  const { tools, setTools } = useContext(ProjectContext);
  // const [tools, setTools] = useState([]);
  useEffect(() => {
    axios
      .post(`${Host}/tools/getAllTools`, {
        inventoryId: localStorage.getItem("inventoryId"),
      })
      .then(({ data }) => {
        setTools(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(tools);

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Tools Table",
    sheet: "Tools Table",
  });

  return (
    <div className="ToolsTable">
      <button onClick={onDownload}> הורדה </button>
      <div className="project-table" ref={tableRef}>
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
    </div>
  );
};

export default ToolsTable;
