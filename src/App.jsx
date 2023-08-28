import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard";
import ToolsPage from "./Components/ToolsPage";
import CashflowPage from "./Components/CashflowPage";
import InventoryTable from "./Components/InventoryTable";
import ProductOrdersTable from "./Components/ProductOrdersTable";
import Login from "./Components/Login";
import ToolsTable from "./Components/ToolsTable";
import AddContractorForm from "./Components/AddContractorForm";
import EndDay from "./Components/EndDay";
import "./App.css";
import { ProjectProvider } from "./Contexts/ProjectContext";
import UpdateContractorForm from "./Components/UpdateContractorForm";
import ProjectPage from "./Components/ProjectPage";
import ContractorPage from "./Components/ContractorPage";
import OrdersPage from "./Components/OrdersPage";
import SignUp from "./Components/SignUp";
import UpdateUserForm from "./Components/UpdateUserForm";
import InventoryPage from "./Components/InventoryPage";
import EndDayTable from "./Components/EndDayTable";
import LastDaySummary from "./Components/LastDaySummary";
import AlternativeDashboard from "./Components/AlternativeDashboard";



// import { UserProvider } from "./Contexts/UserContext";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ProjectProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div className="appmain-container">
            <Routes>
              <Route path="/" index element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/endDay" element={<EndDay />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/constructors" element={<ContractorPage />} />
                <Route path="/endDayTable" element={<LastDaySummary />} />
                <Route
                  path="/updateContractor"
                  element={<UpdateContractorForm />}
                />

                <Route path="/endoftheday" element={<Layout />} />
              </Route>
              <Route path="/projects" element={<ProjectPage />} />


              <Route path="/updateUser" element={<UpdateUserForm />} />
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ProjectProvider>
  );
}

export default App;
