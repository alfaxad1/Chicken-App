import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <form className="mt-10">
        <div>
          <h2>Register a new user</h2>
        </div>
        <div className="mt-3">
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
        <div className="mt-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
          <button
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="mt-3">
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
        <div className="hover:underline text-center py-2">
          <Link to={`/login`}>Already have an account? Login</Link>
        </div>
        <div id="error-message" className="text-center text-red-600 py-2"></div>
        <button
          type="submit"
          onClick={(e) => registerUser(e)}
          className="bg-indigo-500 text-gray-700 rounded-lg bg-center  py-1 w-full 
          hover:bg-indigo-400"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
