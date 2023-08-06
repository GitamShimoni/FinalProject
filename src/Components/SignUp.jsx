import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Host from "../utils/routes";

const SignUp = () => {
    
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(userName, password, fullName, phoneNumber, email);
      const response = await axios.post(`${Host}/users/signup`, {
        userName: userName,
        password: password,
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data._id);

      setUserName("");
      setPassword("");
      setFullName("");
      setPhoneNumber("");
      setEmail("");

      alert("Signup successful!");

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed. Please try again.");
    }
  };
  console.log(userName);
  console.log(password);
  return (
    <form onSubmit={handleSubmit}>
      <h2 id="signup-header">Sign-Up</h2>
      <div className="sign-inputs">
        <label className="input-label">
          User Name: <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
      </div>
      <div className="sign-inputs">
        <label className="input-label">
          Password: <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="sign-inputs">
        <label className="input-label">
          Full Name: <br />
          <input
            className="input"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
      </div>
      <div className="sign-inputs">
        <label className="input-label">
          Phone Number: <br />
          <input
            className="input"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
      </div>
      <div className="sign-inputs">
        <label className="input-label">
          Email: <br />
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" className="login-buttons">
        Sign Up
      </button>
      <div>
        נרשמת? <Link to={"/login"}>
            לחץ כאן
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
