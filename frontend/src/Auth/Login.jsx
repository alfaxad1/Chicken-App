import React from "react";

const Login = () => {
  return (
    <>
      <form id="login-form">
        <div class="input-group">
          <i class="fas fa-user"></i>
          <input type="text" id="username" placeholder="Username" required />
        </div>
        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="register-link"></div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
