import API from "../config/api";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/auth/register`, {
        name,
        email,
        password,
      });

      alert("Account Created Successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Signup Failed");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Start your SaaS billing journey</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Create Account
          </button>
        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;












    // <div className="auth-page">

    //   <div className="auth-card">

    //     <h1>Create Account</h1>
    //     <p>Start your SaaS billing journey</p>

    //     <form onSubmit={handleSignup}>

    //       <input
    //         type="text"
    //         placeholder="Full Name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />

    //       <input
    //         type="email"
    //         placeholder="Email Address"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />

    //       <input
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />

    //       <button type="submit">Create Account</button>

    //     </form>

    //     <p className="bottom-text">
    //       Already have an account? <Link to="/login">Login</Link>
    //     </p>
  