import { Link, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        <span className="logo-icon">💳</span>
        <span className="logo-text">Shaliza Billing</span>
      </div>

      {/* BEFORE LOGIN */}
      {!token && (
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

          <Link to="/login" className="btn-link">
            Login
          </Link>

          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
          <Link to="/Contact" className="btn-primary">Reach Us  </Link>
        </div>
      )}

      {/* AFTER LOGIN */}
      {token && (
        <div className="nav-links">

          <Link to="/dashboard">Dashboard</Link>

          {/* FIXED BILLING ROUTES */}
          <Link to="/billing/customers">Customers</Link>
          <Link to="/billing/products">Products</Link>
          <Link to="/billing/invoices">Invoices</Link>

          <Link to="/reports">Reports</Link>
          <Link to="/settings">Settings</Link>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}

export default Header;