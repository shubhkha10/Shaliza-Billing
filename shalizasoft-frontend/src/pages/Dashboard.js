import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/dashboard.css";

function Dashboard() {
const [data, setData] = useState({});
const [plan, setPlan] = useState("FREE");

const navigate = useNavigate();

const token = localStorage.getItem("token");

useEffect(() => {


const fetchDashboard = async () => {
  try {

    const res = await axios.get(`${API}/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setData(res.data);

  } catch (err) {
    console.log(err);
  }
};

const fetchPlan = async () => {
  try {

   const res = await axios.get(`${API}/subscription/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPlan(
      res.data.subscription_type || "FREE"
    );

  } catch (err) {
    console.log(err);
  }
};

fetchDashboard();
fetchPlan();


}, [token]);

return ( <div className="dashboard-container">


  <h1 className="dashboard-title">
    📊 Dashboard Overview
  </h1>

  <div
    style={{
      background: "#fff",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "20px",
    }}
  >
    <h3>
      Current Plan:
      {" "}
      {plan === "PREMIUM"
        ? "⭐ PREMIUM"
        : "🆓 FREE"}
    </h3>

    {plan !== "PREMIUM" && (
      <button
        onClick={() =>
          navigate("/subscription")
        }
      >
        Upgrade to Premium
      </button>
    )}
  </div>

  <div className="card-grid">

    <div className="card blue">
      <h3>Customers</h3>
      <h2>{data.totalCustomers || 0}</h2>
    </div>

    <div className="card green">
      <h3>Products</h3>
      <h2>{data.totalProducts || 0}</h2>
    </div>

    <div className="card orange">
      <h3>Invoices</h3>
      <h2>{data.totalInvoices || 0}</h2>
    </div>

    <div className="card purple">
      <h3>Revenue</h3>
      <h2>
        ₹{data.totalRevenue || 0}
      </h2>
    </div>

  </div>

  <div className="grid-2">

    <div className="card warning">
      <h3>⚠ Low Stock Alert</h3>
      <h2>{data.lowStockCount || 0}</h2>
      <p>Items need restocking</p>
    </div>

    <div className="card actions">

      <h3>Quick Actions</h3>

      <button
        onClick={() =>
          navigate("/billing/customers")
        }
      >
        ➕ Add Customer
      </button>

      <button
        onClick={() =>
          navigate("/billing/products")
        }
      >
        📦 Add Product
      </button>

      <button
        onClick={() =>
          navigate("/billing/invoices")
        }
      >
        🧾 Create Invoice
      </button>

    </div>

  </div>

</div>


);
}

export default Dashboard;
