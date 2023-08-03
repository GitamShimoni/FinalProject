import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard";
import ToolsPage from "./Components/ToolsPage";
import InventoryTable from "./Components/InventoryTable";
import ProductOrdersTable from "./Components/ProductOrdersTable";
import Login from "./Components/Login";
import ToolsTable from "./Components/ToolsTable";
import AddContractorForm from "./Components/AddContractorForm";
import "./App.css";
import { ProjectProvider } from "./Contexts/ProjectContext";
import UpdateContractorForm from "./Components/UpdateContractorForm";
import ProjectPage from "./Components/ProjectPage";
import ContractorPage from "./Components/ContractorPage";
import OrdersPage from "./Components/OrdersPage";

// import { UserProvider } from "./Contexts/UserContext";
function App() {
  return (
    <ProjectProvider>
      <div className="appmain-container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/inventory" element={<InventoryTable />} />
            <Route path="/orders" element={<OrdersPage />} />

            <Route path="/constructors" element={<AddContractorForm />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route
              path="/updateContractor"
              element={<UpdateContractorForm />}
            />

            <Route path="/endoftheday" element={<Layout />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ProjectProvider>
  );
}

export default App;
