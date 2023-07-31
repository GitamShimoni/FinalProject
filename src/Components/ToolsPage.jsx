import ToolsTable from "./ToolsTable";
import CreateATool from "./CreateATool";
import "./ToolsPage.css";
const ToolsPage = () => {
  return (
    <div id="toolspage-container">
      <ToolsTable />
      <CreateATool />
    </div>
  );
};

export default ToolsPage;
