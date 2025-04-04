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
    e.preventDefault();
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const Register = async () => {
    const response = await axios.post(
      `http://localhost:3000/api/users/register`,
      registrationData
    );
    if (response) {
      console.log(response);
      navigate(`/login`);
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
        <div id="validation-message"></div>
        <button type="submit" onClick={(e) => Register(e)}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
