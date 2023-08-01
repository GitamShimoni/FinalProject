import React from "react";
import "./DeleteService.css";
import axios from "axios";
import Host from "../utils/routes";

function DeleteService({serviceId, setServicesArr}) {

async function handleDelete() {
  if(confirm("האם אתה בטוח שאתה רוצה להסיר את שירות זה? לא תהיה דרך לשחזר")){
    await axios
    .post(
      `${Host}/contractor/deleteService`,
      {serviceId: serviceId}
    )
    .then(({ data }) => {
      console.log(data)
      setServicesArr((prev)=>prev.filter((item)=> item._id != serviceId))     
    })
    .catch((err) => console.log(err));
  }
  
}

  return (
    <button onClick={()=>handleDelete()} className="btn">
      <svg
        viewBox="0 0 15 17.5"
        height="17.5"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
      >
        <path
          transform="translate(-2.5 -1.25)"
          d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
          id="Fill"
        ></path>
      </svg>
    </button>
  );
}

export default DeleteService;
