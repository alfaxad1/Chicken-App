import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({ password: "", username: "" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/login`,
        values
      );
      console.log(response);
      const user = response.data.user;
      console.log(user);
      const token = response.data.token;
      console.log(token);
      if (token) {
        navigate("/purchases");
      } else {
        console.log(response.data.error);
        const errormsg = document.getElementById("error-message");
        errormsg.innerText = response.data.error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form id="login-form" className="m-4">
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
        <div id="error-message" className="text-center text-red-600 py-2"></div>
        <div className="hover:underline text-center py-2">
          <Link to={`/register`}>Do not have an account? Register</Link>
        </div>
        <button
          type="submit"
          onClick={(e) => Login(e)}
          className="bg-indigo-500 text-gray-700 rounded-lg bg-center  py-1 w-full 
          hover:bg-indigo-400"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
