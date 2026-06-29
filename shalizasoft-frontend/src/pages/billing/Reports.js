import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/api";
import "../../assets/css/reports.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const [report, setReport] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    lowStockCount: 0,
    monthlyRevenue: [],
    topProducts: [],
    recentInvoices: [],
  });

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API}/reports/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReport(res.data || {});
    } catch (error) {
      console.log("REPORT ERROR:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="page-container">
      <h1>Reports Dashboard</h1>

      <div className="reports-grid">
        <div className="card">
          <h3>Customers</h3>
          <h2>{report.totalCustomers || 0}</h2>
        </div>

        <div className="card">
          <h3>Products</h3>
          <h2>{report.totalProducts || 0}</h2>
        </div>

        <div className="card">
          <h3>Invoices</h3>
          <h2>{report.totalInvoices || 0}</h2>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <h2>₹{report.totalRevenue || 0}</h2>
        </div>
      </div>

      <div className="charts-grid">

        <div className="card">
          <h3>Monthly Revenue</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={report.monthlyRevenue || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Top Products</h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={report.topProducts || []}
                dataKey="totalSold"
                nameKey="product_name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={40}
                paddingAngle={3}
                label={({ name, value }) =>
                  value ? `${name} (${value})` : name
                }
              >
                {(report.topProducts || []).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="card mt-20">
        <h3>Low Stock Items</h3>
        <h2>{report.lowStockCount || 0}</h2>
      </div>

      <div className="card mt-20">
        <h3>Recent Invoices</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Customer</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {(report.recentInvoices || []).map((item) => (
              <tr key={item.id}>
                <td>{item.invoice_number}</td>
                <td>{item.customer_name}</td>
                <td>₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Reports;