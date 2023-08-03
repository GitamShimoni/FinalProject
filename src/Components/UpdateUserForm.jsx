import React, { useState } from "react";
import axios from "axios";
import Host from "../utils/routes";

const UpdateUserForm = ({ token }) => {
  const [userName, setUserName] =useState('')
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${Host}/users/updateUsers`, {
        token, // Use the userId as the token
        userName: userName || undefined,
        phone: phone || undefined, // Include the phone field only if it's non-empty
        password: password || undefined, // Include the password field only if it's non-empty
        email: email || undefined, // Include the email field only if it's non-empty
      });

      if (response.status === 200) {
        setMessage("User updated successfully.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the user.");
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateUserForm;
