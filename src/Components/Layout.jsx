import Loader from "./Loader";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useState } from "react";
import "animate.css";
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';

const Layout = () => {
  const [endDayClicked, setEndDayClicked] = useState(false);
  const navigate = useNavigate();

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
