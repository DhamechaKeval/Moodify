import React, { useState } from "react";
import Form from "../components/Form";
import { Link, useNavigate } from "react-router";
import "../style/register.scss";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <Form
            value={username}
            onChange={(e) => setusername(e.target.value)}
            label="username"
            placeholder="Enter your username"
          />
          <Form
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="email"
            placeholder="Enter your email"
          />
          <Form
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="password"
            placeholder="Enter your password"
          />
          <button className="button" type="submit">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
