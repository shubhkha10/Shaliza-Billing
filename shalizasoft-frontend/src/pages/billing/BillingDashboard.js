// import { useEffect, useState } from "react";
// import axios from "axios";
// import API from "../../config/api";
// import "../../assets/css/billing.css";

// function BillingDashboard() {
//   const [loading, setLoading] = useState(true);

//   const [data, setData] = useState({
//     totalCustomers: 0,
//     totalProducts: 0,
//     totalInvoices: 0,
//     totalRevenue: 0,
//     recentInvoices: [],
//     lowStock: [],
//   });

//   const fetchDashboard = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         `${API}/billing/dashboard`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setData(res.data || {});
//     } catch (err) {
//       console.log("Billing Dashboard Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   if (loading) {
//     return (
//       <div className="billing-container">
//         <h2>Loading Dashboard...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="billing-container">

//       <div className="dashboard-header">
//         <h1>📊 Billing Dashboard</h1>
//         <p>Overview of your business performance</p>
//       </div>

//       <div className="billing-stats">

//         <div className="stat-card">
//           <h3>Total Customers</h3>
//           <h2>{data.totalCustomers || 0}</h2>
//         </div>

//         <div className="stat-card">
//           <h3>Total Products</h3>
//           <h2>{data.totalProducts || 0}</h2>
//         </div>

//         <div className="stat-card">
//           <h3>Total Invoices</h3>
//           <h2>{data.totalInvoices || 0}</h2>
//         </div>

//         <div className="stat-card revenue">
//           <h3>Total Revenue</h3>
//           <h2>₹{Number(data.totalRevenue || 0).toLocaleString()}</h2>
//         </div>

//       </div>

//       <div className="dashboard-grid">

//         <div className="dashboard-card">
//           <h2>Recent Invoices</h2>

//           <table className="invoice-table">
//             <thead>
//               <tr>
//                 <th>Invoice</th>
//                 <th>Customer</th>
//                 <th>Product</th>
//                 <th>Total</th>
//               </tr>
//             </thead>

//             <tbody>
//               {(data.recentInvoices || []).length > 0 ? (
//                 data.recentInvoices.map((invoice) => (
//                   <tr key={invoice.id}>
//                     <td>{invoice.invoice_number}</td>
//                     <td>{invoice.customer_name}</td>
//                     <td>{invoice.product_name}</td>
//                     <td>₹{invoice.total}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" style={{ textAlign: "center" }}>
//                     No invoices found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="dashboard-card">
//           <h2>⚠ Low Stock Products</h2>

//           {(data.lowStock || []).length > 0 ? (
//             data.lowStock.map((product) => (
//               <div key={product.id} className="stock-item">
//                 <span>{product.product_name}</span>
//                 <strong>{product.stock_quantity} Left</strong>
//               </div>
//             ))
//           ) : (
//             <p>No low stock products.</p>
//           )}
//         </div>

//       </div>

//     </div>
//   );
// }

// export default BillingDashboard;

import { useEffect, useState } from "react";
import API from "../../config/api";
import "../../assets/css/billing.css";

function BillingDashboard() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    recentInvoices: [],
    lowStock: [],
  });

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/billing/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Billing Dashboard Response:", res.data);

      setData(res.data || {});
    } catch (err) {
      console.log("Billing Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="billing-container">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="billing-container">

      <div className="dashboard-header">
        <h1>📊 Billing Dashboard</h1>
        <p>Overview of your business performance</p>
      </div>

      <div className="billing-stats">

        <div className="stat-card">
          <h3>Total Customers</h3>
          <h2>{data.totalCustomers || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Products</h3>
          <h2>{data.totalProducts || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Invoices</h3>
          <h2>{data.totalInvoices || 0}</h2>
        </div>

        <div className="stat-card revenue">
          <h3>Total Revenue</h3>
          <h2>₹{Number(data.totalRevenue || 0).toLocaleString()}</h2>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>Recent Invoices</h2>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {(data.recentInvoices || []).length > 0 ? (
                data.recentInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.invoice_number}</td>
                    <td>{invoice.customer_name}</td>
                    <td>{invoice.product_name}</td>
                    <td>₹{invoice.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="dashboard-card">
          <h2>⚠ Low Stock Products</h2>

          {(data.lowStock || []).length > 0 ? (
            data.lowStock.map((product) => (
              <div key={product.id} className="stock-item">
                <span>{product.product_name}</span>
                <strong>{product.stock_quantity} Left</strong>
              </div>
            ))
          ) : (
            <p>No low stock products.</p>
          )}
        </div>

      </div>

    </div>
  );
}

export default BillingDashboard;