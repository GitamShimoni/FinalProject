import { createContext, useState } from "react";
export const ProjectContext = createContext();
export const ProjectProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  return (
    <ProjectContext.Provider value={{ tools, setTools }}>
      {children}
    </ProjectContext.Provider>
  );
};
