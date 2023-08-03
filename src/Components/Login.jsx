import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Host from "../utils/routes";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(
        "Sending login request with credentials:",
        userName,
        password
      );
      const response = await axios.post(`${Host}/users/login`, {
        userName: userName,
        password: password,
      });

      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      setLoading(false);
      navigate("/projects");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      alert("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="userpage">
      {loading ? (
        <div className="banter-loader">
        </div>
      ) : (
        <div className="login-block">
          <form className="login-form" onSubmit={handleLogin}>
            <div>
              <label htmlFor="userName">:שם משתמש</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor="password">:סיסמא</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            <br />
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
