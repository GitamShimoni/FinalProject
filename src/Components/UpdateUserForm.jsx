import React, { useState } from "react";
import axios from "axios";
import Host from "../utils/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateUserForm.css";
import DeleteUserBtn from "./DeleteUserBtn";

const UpdateUserForm = ({ token, userId, onClose, users, setUsers }) => {
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
        userId: userId,
        userName: userName || undefined,
        phone: phone || undefined,
        password: password || undefined,
        email: email || undefined,
      });
      const updatedUsersResponse = await axios.get(`${Host}/users/getUsers`);
      setUsers(updatedUsersResponse.data);

      if (response.status === 200) {
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
      }
      onClose();
    } catch (error) {
      toast.error("אי אפשר לשמור את המשתמש", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handleClose = onClose;
  

  return (
    <div className="update-user-modal">
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
      <div className="update-user-modal-content">
        <span className="update-user-modal-close-button" onClick={handleClose}>
          &times;
        </span>
        <h2 className="update-user-form-headline">עדכון משתמש</h2>
        <form className="update-user-form" onSubmit={handleSubmit}>
          <label className="update-user-label">
            :שם משתמש
            <input
              className="update-user-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <br />
          <label className="update-user-label">
            :מספר פלאפון
            <input
              className="update-user-input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <label className="update-user-label">
            :סיסמא
            <input
              className="update-user-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label className="update-user-label">
            :אימייל
            <input
              className="update-user-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <button
            className="update-user-submit-btn"
            type="submit"
            onClick={handleSubmit}
          >
            שמור
          </button>
          <DeleteUserBtn realId={userId} setUsers={setUsers} onClose={onClose}/>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UpdateUserForm;
