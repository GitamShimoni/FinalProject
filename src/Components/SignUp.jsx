import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Host from "../utils/routes";
import './SignUp.css'

const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed. Please try again.");
      setLoading(false);
    }
  };
  console.log(userName);
  console.log(password);
  return (
    <div className="signup-page">
      {loading ? (
        <div className="banter-loader"></div>
      ) : (
        <div className="signup-block">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2 id="signup-header">הרשמה</h2>
            <div className="signup-inputs-container">
              <label className="signup-input-label">
                 :שם משתמש <br />
                <input
                  className="signup-input"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
            </div>
            <div className="signup-inputs-container">
              <label className="signup-input-label">
                :סיסמא <br />
                <input
                  className="signup-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="signup-inputs-container">
              <label className="signup-input-label">
                :שם מלא <br />
                <input
                  className="signup-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
            </div>
            <div className="signup-inputs-container">
              <label className="signup-input-label">
                 :מספר פלאפון <br />
                <input
                  className="signup-input"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
            </div>
            <div className="signup-inputs-container">
              <label className="signup-input-label">
                :מייל <br />
                <input
                  className="signup-input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <button type="submit" className="signup-buttons">
               הירשם
            </button>
            <div>
              נרשמת? <Link to={"/login"}>לחץ כאן</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
