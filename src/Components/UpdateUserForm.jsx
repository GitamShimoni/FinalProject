import React, { useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import "./UpdateUserForm.css"

const UpdateUserForm = ({ token, onClose }) => {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${Host}/users/updateUsers`, {
        token: localStorage.getItem("token"),
        userName: userName || undefined,
        phone: phone || undefined,
        password: password || undefined, 
        email: email || undefined, 
      });

      if (response.status === 200) {
        setMessage("User updated successfully.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the user.");
    }
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="update-user-modal">
      <div className="update-user-modal-content">
        <span className="update-user-modal-close-button" onClick={handleClose}>
            &times;
        </span>
        <h2 className="update-user-form-headline">עדכון משתמש</h2>
        <form className="update-user-form" onSubmit={handleSubmit}>
          <label className="update-user-label">
             :שם משתמש
            <input className="update-user-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <br />
          <label className="update-user-label">
             :מספר פלאפון
            <input className="update-user-input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <label className="update-user-label">
             :סיסמא
            <input className="update-user-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label className="update-user-label">
            :אימייל
            <input className="update-user-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <button className="update-user-submit-btn" type="submit">שמור</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UpdateUserForm;
