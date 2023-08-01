import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div id="navbar-container">
      <Link to={"/dashboard"}>
        <h2 className="navbar-header">לוח בקרה</h2>
      </Link>
      <Link to={"/inventory"}>
        <h2 className="navbar-header">מלאי</h2>
      </Link>
      <Link to={"/orders"}>
        <h2 className="navbar-header">הזמנות</h2>
      </Link>
      <Link to={"/tools"}>
        <h2 className="navbar-header">כלים</h2>
      </Link>
      <Link to={"/constructors"}>
        <h2 className="navbar-header">קבלנים</h2>
      </Link>
      <Link to={"/projects"}>
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
