import ToolsTable from "./ToolsTable";
import CreateATool from "./CreateATool";
// import axios from "axios";
// import Host from "../utils/routes";
import "./ToolsPage.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";




const ToolsPage = () => {

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
      <ToolsTable />
      <CreateATool />
    </div>
  );
};

export default ToolsPage;
