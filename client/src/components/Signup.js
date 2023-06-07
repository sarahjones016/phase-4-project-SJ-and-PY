import React, { useState } from "react";

function SignUp({ onLogin, user}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        admin,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      }
    });
  }

  function handleChange(e) {
    setAdmin(e.target.checked);
 }
 
  return (
    <div>
    {user ? (<p>{user.email} is currently logged in</p>) : <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
        //   autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        //   autoComplete="current-password"
        />
        <label htmlFor="admin">Admin</label>
        <input 
          name="admin" 
          type="checkbox" 
          value={admin}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>}
      
    </div>
  );
}

export default SignUp;