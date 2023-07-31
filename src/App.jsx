import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard";
import ToolsTable from "./Components/ToolsTable";
import "./App.css";
import { ProjectProvider } from "./Contexts/ProjectContext";
import ProductOrderForm from "./Components/ProductOrderForm";
import IronOrderForm from "./Components/IronOrderForm";
// import { UserProvider } from "./Contexts/UserContext";
function App() {
  return (
    <ProjectProvider>
      <div className="appmain-container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tools" element={<ToolsTable />} />
            <Route path="/inventory" element={<ToolsTable />} />
            <Route path="/orders" element={<IronOrderForm/>} />
            <Route path="/constructors" element={<Layout />} />
            <Route path="/endoftheday" element={<Layout />} />
          </Route>
          <Route path="/login" element={<Layout />} />
        </Routes>
      </div>
    </ProjectProvider>
  );
}

export default App;
