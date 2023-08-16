import Loader from "./Loader";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useState } from "react";
import "animate.css";

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
            </div>{" "}
            <div
              className="Layout-endDayOptions animate_animated animate_zoomIn "
              onClick={() => {
                navigate("/endDay");
                setEndDayClicked(false);
              }}
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
