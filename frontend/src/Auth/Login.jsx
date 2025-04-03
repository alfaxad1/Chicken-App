import React, { useState } from "react";

const Login = () => {
  const [values, setValues] = useState({ password: "", username: "" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
