import Loader from "./Loader";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import "animate.css";
import { useState } from "react";
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import React, { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";

const Layout = () => {
  const { tools } = useContext(ProjectContext);
  const navigate = useNavigate();
  const [endDayClicked, setEndDayClicked] = useState(false);

  const setEndDayClickedHandler = () => {
    const toolsNotReturned = tools.some((tool) => tool?.takenBy !== undefined);

    if (toolsNotReturned) {
      alert(
        "נראה שיש כלים שלא הוחזרו. וודא שהכלים חזרו לפני שאתה מסיים את היום"
      );
    } else {
      navigate("/endDay");
    }
  };

  return (
    <div className="Layout-container">
      <Navbar />
      <Outlet />

      <div
        className="Layout-EndDay-btn"
        onClick={() => setEndDayClicked(!endDayClicked)}
      >
        <TodayOutlinedIcon fontSize="large" />

        {endDayClicked && (
          <div className="Layout-endDayOptions-section animate_animated animate__backInLeft ">
            <div
              className="Layout-endDayOptions"
              onClick={() => {
                navigate("/endDayTable");
                setEndDayClicked(false);
              }}
            >
              <PreviewOutlinedIcon fontSize="large" color="action"/>
            </div>{" "}
            <div
              className="Layout-endDayOptions"
              onClick={() => {
                navigate("/endDay");
                setEndDayClicked(false);
              }}

            >
              <NoteAddOutlinedIcon fontSize="large" color="action"/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
