import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const userDb = [
    {
      email: "admin@winetime.com",
      password: "password",
    },
    {
      email: "customer@winetime.com",
      password: "password",
    },
  ];
  const error = {
    email: "invalid email",
    password: "invalid password",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var { email, pass } = document.forms[0];
    const userData = userDb.find((user) => user.email === email.value);
    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessage({ name: "password", message: error.password });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessage({ name: "email", message: error.email });
    }
  };
  const renderErrorMessage = (email) =>
    email === errorMessage.email && (
      <div className="error">{errorMessage.message}</div>
    );
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container" >
          <label></label>
          <input type="text" name="email" required placeholder="Email"/>
          {renderErrorMessage("email")}
        </div>
        <div className="input-container" >
          <label></label>
          <input type="password" name="pass" required placeholder="Password"/>
          {renderErrorMessage("password")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  return (
  <div className="login-form">Login
    <div className="title">Sign In</div>
    {isSubmitted ? <div> User is successfully logged in</div>: renderForm}
  </div>
  );
}

export default Login;
