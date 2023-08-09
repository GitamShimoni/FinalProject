import ToolsTable from "./ToolsTable";
import CreateATool from "./CreateATool";
// import axios from "axios";
// import Host from "../utils/routes";
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
  
  // const token = localStorage.getItem("token");
  // useEffect(() => {
  
  //       if (!token || token == null || token == undefined) {
  //         useNavigate("/");
  //       }
        // else{
        //   axios.post(`${Host}/users/isToken`,{
        //   token: token
        //  })
        //  console.log(answer);
        // }
      // }
      //   , [])
          
        // if(!localStorage.getItem("token")){
        //   useNavigate("/");
        // }
        // else{
        //   axios.post(`${Host}/users/isToken`,{
        //   token: localStorage.getItem("token")
        //   }).then(console.log("HELLO"))
        //   .catch((err) => console.log(err, "error"))
        // }

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
