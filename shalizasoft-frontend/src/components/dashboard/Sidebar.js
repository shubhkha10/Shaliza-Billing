import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>ShalizaSoft</h2>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/billing">Billing</Link>

      <Link to="/inventory">Inventory</Link>

      <Link to="/crm">CRM</Link>

      <Link to="/ai-tools">AI Tools</Link>

      <Link to="/settings">Settings</Link>
      <Link to="/billing/customers">
  Customers
</Link>
<Link to="/billing/invoices">
  Invoices
</Link>

    </div>
  );
}

export default Sidebar;