import Loader from "./Loader";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useState } from "react";
import React, {useContext} from "react";
import { ProjectContext } from "../Contexts/ProjectContext";

const Layout = () => {
  const { tools } = useContext(ProjectContext);
  const navigate = useNavigate();
  const [endDayClicked, setEndDayClicked] = useState(false); 

  const setEndDayClickedHandler = () => {
    const toolsNotReturned = tools.some((tool) => tool?.takenBy !== undefined);

    if (toolsNotReturned) {
      alert("נראה שיש כלים שלא הוחזרו. וודא שהכלים חזרו לפני שאתה מסיים את היום");
    } else {
      navigate("/endDay");
    }
  };

  return (
    <div className="Layout-container">
      <Navbar />
      <Outlet />
      <div className="Layout-EndDay-btn" onClick={() => setEndDayClicked(true)}> 
        סוף יום
        {endDayClicked && (
          <div className="Layout-endDayOptions-section ">
            <div
              className="Layout-endDayOptions animate_animated animate_zoomIn "
              onClick={() => {
                navigate("/endDayTable");
                setEndDayClicked(false);
              }}
            >
              יום קודם
            </div>
            <div
              className="Layout-endDayOptions animate_animated animate_zoomIn "
              onClick={() => setEndDayClickedHandler()} 
            >
              הגש סוף יום
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
