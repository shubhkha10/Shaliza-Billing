import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="topbar">
      <h3>Dashboard</h3>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Topbar;