import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
const [email, setEmail] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const res = await axios.post(
    "http://localhost:5001/api/auth/forgot-password",
    { email }
  );

  alert(res.data.message);
} catch (err) {
  alert(
    err.response?.data?.message ||
    "Error sending reset email"
  );
}


};

return ( <div className="auth-page"> <div className="auth-card">


    <h1>Forgot Password</h1>

    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button type="submit">
        Send Reset Link
      </button>

    </form>

  </div>
</div>


);
}

export default ForgotPassword;
