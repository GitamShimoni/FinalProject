import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Host from "../utils/routes";
import "./SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({onClose}) => {
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

      toast.success("המשתמש עודכן בהצלחה!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      onClose();
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed. Please try again.");
    }
  };

  const handleClose = () => {
    onClose(false);
  };
  console.log(userName);
  console.log(password);
  return (
    <div className="create-user-modal">
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="create-user-modal-content">
        <span className="create-user-modal-close-button" onClick={handleClose}>
          &times;
        </span>
        <h2 id="create-user-form-headline">הרשמה</h2>
        <form className="create-user-form" onSubmit={handleSubmit}>
          <label className="create-user-label">
            :שם משתמש <br />
            <input
              required
              className="create-user-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label className="create-user-label">
            :סיסמא <br />
            <input
              required
              className="create-user-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="create-user-label">
            :שם מלא <br />
            <input
              required
              className="create-user-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label className="create-user-label">
            :מספר פלאפון <br />
            <input
              required
              className="create-user-input"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label className="create-user-label">
            :מייל <br />
            <input
              className="create-user-input"
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit" className="create-user-submit-btn">
            הירשם
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
