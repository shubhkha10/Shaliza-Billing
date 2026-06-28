import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResetPassword() {
const { token } = useParams();

const [password, setPassword] =
useState("");

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const res = await axios.post(
    `http://localhost:5001/api/auth/reset-password/${token}`,
    { password }
  );

  alert(res.data.message);
} catch (err) {
  alert(
    err.response?.data?.message ||
    "Reset Failed"
  );
}


};

return ( <div className="auth-page"> <div className="auth-card">


    <h1>Reset Password</h1>

    <form onSubmit={handleSubmit}>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Update Password
      </button>

    </form>

  </div>
</div>


);
}

export default ResetPassword;
