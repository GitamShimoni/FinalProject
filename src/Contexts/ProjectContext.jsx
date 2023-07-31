import { createContext, useState } from "react";
export const ProjectContext = createContext();
export const ProjectProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [contracors, setContractors] = useState([]);
  const [projectId, setProjectId] = useState("");
  return (
    <ProjectContext.Provider value={{ tools, setTools, contracors, setContractors }}>
      {children}
    </ProjectContext.Provider>
  );
};
