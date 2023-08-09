import ToolsTable from "./ToolsTable";
import CreateATool from "./CreateATool";
import "./ToolsPage.css";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const ToolsPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div id="toolspage-container">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ToolsTable />
          <CreateATool />
        </div>
      )}
    </div>
  );
};

export default ToolsPage;
