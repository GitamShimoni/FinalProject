import { useContext } from "react";
import { ColorModeContext, tokens } from "../Theme"
import { IconButton, useTheme } from "@mui/material";
import { DarkModeOutlined } from "@mui/icons-material";
import { LightModeOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);
  const deleteLocalStoarge = () => {
    localStorage.clear();
  };
  return (
    <div id="navbar-container">
      <Link className="navbar-link" to={"/"}>
        <button className="logout-btn" onClick={() => deleteLocalStoarge()}>
          <div className="logout-btn-sign">
            <svg className="logout-btn-svg" viewBox="0 0 512 512">
              <path
                className="logout-btn-sign-path"
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              ></path>
            </svg>
          </div>
          <div className="logout-text">התנתק</div>
        </button>
      </Link>
      {/* <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlined />
        ) : (
          <LightModeOutlined />
        )}
      </IconButton> */}
      <Link className="navbar-link" to={"/dashboard"}>
        <h2 className="navbar-header">לוח בקרה</h2>
      </Link>
      <Link className="navbar-link" to={"/inventory"}>
        <h2 className="navbar-header">מלאי</h2>
      </Link>
      <Link className="navbar-link" to={"/orders"}>
        <h2 className="navbar-header">הזמנות</h2>
      </Link>
      <Link className="navbar-link" to={"/tools"}>
        <h2 className="navbar-header">כלים</h2>
      </Link>
      <Link className="navbar-link" to={"/constructors"}>
        <h2 className="navbar-header">קבלנים</h2>
      </Link>
      <Link className="navbar-link" to={"/projects"}>
        <img
          id="navbar-logo"
          src="https://img.freepik.com/free-icon/pie-chart_318-372376.jpg"
          alt="Navbar icon"
        />
      </Link>
    </div>
  );
};

export default Navbar;
