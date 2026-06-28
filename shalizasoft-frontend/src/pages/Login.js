import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back</h1>
        <p>Login to your billing dashboard</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

        <p className="bottom-text">
          Don’t have account? <Link to="/signup">Sign up</Link>
        </p>
        <p style={{ marginTop: "10px" }}>
  <Link to="/forgot-password">
    Forgot Password?
  </Link>
</p>

      </div>

    </div>
  );
}

export default Login;