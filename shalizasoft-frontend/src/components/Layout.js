import { Link } from "react-router-dom";
import "../assets/css/layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">ShalizaSoft</h2>

        <nav>
          <Link to="/dashboard">📊 Dashboard</Link>
          <Link to="/billing">🧾 Billing</Link>
          <Link to="/billing/customers">👤 Customers</Link>
          <Link to="/billing/products">📦 Products</Link>
          <Link to="/billing/invoices">🧾 Invoices</Link>
          <Link to="/inventory">📊 Inventory</Link>
          {/* <Link to="/crm">🤝 CRM</Link>
          <Link to="/ai-tools">🤖 AI Tools</Link> */}
          <Link to="/settings">⚙ Settings</Link>
          <Link to="/subscription">
  ⭐ Upgrade
</Link>
<Link to="/calculator">🧮 Calculator</Link>
<Link to="/payments">
  💳 Payments
</Link>
<Link to="/contact">📞 Reach Us</Link>
<Link to="/help">
    🆘 Help Center
</Link>
        </nav>
      </div>

      {/* MAIN */}
      <div className="main">{children}</div>
    </div>
  );
}

export default Layout;