import React, { useState } from "react";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login sucessfull");
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="email"></label>
        <input
          type="text"
          value={email}
          id="email"
          placeholder="Email"
          onChange={handleChangeEmail}
          required
        />

        <label htmlFor="password"></label>

        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={handleChangePassword}
          required
        />
        <button type="submit">Login</button>
        <button type="button">Forgot Password</button>
        <button type="button">Create New Account</button>

        <button className="bg-blue-9000 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
          Click me
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Red
        </button>
      </form>
    </>
  );
}

export default Login;
