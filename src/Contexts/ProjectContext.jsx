import { createContext, useState } from "react";
export const ProjectContext = createContext();
export const ProjectProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productOrders, setProductOrders] = useState([]);
  const [contractorsArr, setContractorsArr] = useState([]);
  const [ironOrders, setIronOrders] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [ordersId, setOrdersId] = useState("");
  return (
    <ProjectContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
