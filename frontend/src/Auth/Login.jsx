import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate;

const Login = () => {
  const [values, setValues] = useState({ password: "", username: "" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/users`);
      console.log(response.data.message);
      const token = response.data.token;
      console.log(token);
      if (token) {
        navigate("/purchases");
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form id="login-form">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {/* <div></div> to register */}
        <button type="submit" onClick={(e) => Login(e)}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
