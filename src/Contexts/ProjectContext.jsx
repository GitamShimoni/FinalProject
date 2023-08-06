import { createContext, useState } from "react";
export const ProjectContext = createContext();
export const ProjectProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productOrders, setProductOrders] = useState([]);
  const [contractorsArr, setContractorsArr] = useState([]);
  const [inventoryArr, setInventoryArr] = useState([]);
  const [ironOrders, setIronOrders] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [ordersId, setOrdersId] = useState("");
  const [contractorsArr, setContractorsArr] = useState("");

  return (
    <ProjectContext.Provider
      value={{
        projectId,
        setProjectId,
        tools,
        setTools,
        orders,
        setOrders,
        ironOrders,
        setIronOrders,
        productOrders,
        setProductOrders,
        ordersId,
        setOrdersId,
        contractorsArr,
        setContractorsArr,
        inventoryArr,
        setInventoryArr,

      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
