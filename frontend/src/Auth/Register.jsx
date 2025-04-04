import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/register`,
        registrationData
      );
      if (response.data.Status === "Success") {
        console.log(response.data.message);
        navigate(`/login`);
      }
    } catch (error) {
      if (error.response) {
        const errormsg = error.response.data.error.message.replace(/"/g, "");
        console.log(errormsg);
        const errorMessage = document.getElementById("error-message");
        errorMessage.innerText = errormsg;
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <form>
        <div>
          <h2>Register a new user</h2>
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <select
            name="role"
            required
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="viewer">Choose Role...</option>
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div></div>
        <div id="error-message"></div>
        <button type="submit" onClick={(e) => registerUser(e)}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
