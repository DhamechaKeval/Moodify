import React, { useState } from "react";
import "../style/login.scss";
import Form from "./../components/Form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Form
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="email"
            placeholder="Enter your email"
          />
          <Form
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="password"
            placeholder="Enter your password"
          />
          <button className="button" type="submit">
            Login
          </button>
          <p>
            Don't have an account? <Link to="/register"> Register</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
