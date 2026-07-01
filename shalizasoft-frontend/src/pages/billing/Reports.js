// import { useEffect, useState } from "react";import axios from "axios";import "../../assets/css/reports.css";

// import {BarChart,Bar,XAxis,YAxis,Tooltip,PieChart,Pie,Cell,Legend,ResponsiveContainer,} from "recharts";

// function Reports() {const [report, setReport] = useState({totalCustomers: 0,totalProducts: 0,totalInvoices: 0,totalRevenue: 0,lowStockCount: 0,monthlyRevenue: [],topProducts: [],recentInvoices: [],});

// const fetchReport = async () => {try {const token = localStorage.getItem("token");

//   console.log("TOKEN:", token);

//   const res = await axios.get(
//     "http://localhost:5001/api/reports/dashboard",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   console.log("REPORT DATA:", res.data);

//   setReport(res.data);
// } catch (error) {
//   console.log("REPORT ERROR:", error);

//   if (error.response) {
//     console.log(error.response.data);
//   }
// }

// };

// useEffect(() => {fetchReport();}, []);

// const COLORS = ["#0088FE","#00C49F","#FFBB28","#FF8042",];

// return (<div className="page-container"><h1>Reports Dashboard</h1>

//   <div className="reports-grid">
//     <div className="card">
//       <h3>Customers</h3>
//       <h2>{report.totalCustomers}</h2>
//     </div>

//     <div className="card">
//       <h3>Products</h3>
//       <h2>{report.totalProducts}</h2>
//     </div>

//     <div className="card">
//       <h3>Invoices</h3>
//       <h2>{report.totalInvoices}</h2>
//     </div>

//     <div className="card">
//       <h3>Total Revenue</h3>
//       <h2>₹{report.totalRevenue}</h2>
//     </div>
//   </div>

//   <div className="charts-grid">
//     <div className="card">
//       <h3>Monthly Revenue</h3>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={report.monthlyRevenue}>
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Bar
//             dataKey="revenue"
//             fill="#8884d8"
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>

// <div className="card">
//   <h3>Top Products</h3>

//   <ResponsiveContainer width="100%" height={320}>
//     <PieChart>
//      <Pie
//     data={report.topProducts || []}
//     dataKey={(item) => Number(item.totalSold)}
//         nameKey="product_name"
//         cx="50%"
//         cy="50%"
//         outerRadius={120}
//         innerRadius={40}
//         paddingAngle={3}
//         labelLine={false}
//         label={({ name, value }) =>
//           value ? `${name} (${value})` : name
//         }
//       >
//         {(report.topProducts || []).map((entry, index) => (
//           <Cell
//             key={`cell-${index}`}
//             fill={COLORS[index % COLORS.length]}
//             stroke="#ffffff"
//             strokeWidth={2}
//           />
//         ))}
//       </Pie>

//   <Tooltip />
//   <Legend />
// </PieChart>

//   </ResponsiveContainer>
// </div>
//       </div>

//   <div className="card mt-20">
//     <h3>Low Stock Items</h3>
//     <h2>{report.lowStockCount}</h2>
//   </div>

//   <div className="card mt-20">
//     <h3>Recent Invoices</h3>

//     <table className="report-table">
//       <thead>
//         <tr>
//           <th>Invoice No</th>
//           <th>Customer</th>
//           <th>Total</th>
//         </tr>
//       </thead>

//       <tbody>
//         {report.recentInvoices.map(
//           (item) => (
//             <tr key={item.id}>
//               <td>
//                 {item.invoice_number}
//               </td>
//               <td>
//                 {item.customer_name}
//               </td>
//               <td>
//                 ₹{item.total}
//               </td>
//             </tr>
//           )
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>

// );}

// export default Reports;
 



import { useEffect, useState } from "react";
import API from "../../config/api";
import "../../assets/css/reports.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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

  const token = localStorage.getItem("token");

  const fetchReport = async () => {
    try {
      const res = await API.get("/reports/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReport(res.data);
    } catch (error) {
      console.log("REPORT ERROR:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="page-container">
      <h1>Reports Dashboard</h1>

      <div className="reports-grid">
        <div className="card">
          <h3>Customers</h3>
          <h2>{report.totalCustomers}</h2>
        </div>

        <div className="card">
          <h3>Products</h3>
          <h2>{report.totalProducts}</h2>
        </div>

        <div className="card">
          <h3>Invoices</h3>
          <h2>{report.totalInvoices}</h2>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <h2>₹{report.totalRevenue}</h2>
        </div>
      </div>

      <div className="charts-grid">

        {/* Monthly Revenue */}
        <div className="card">
          <h3>Monthly Revenue</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={report.monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="#8884d8"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="card">
          <h3>Top Products</h3>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={(report.topProducts || []).map((item) => ({
                ...item,
                totalSold: Number(item.totalSold),
              }))}
            >
              <XAxis dataKey="product_name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="totalSold"
                fill="#00C49F"
                name="Units Sold"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="card mt-20">
        <h3>Low Stock Items</h3>
        <h2>{report.lowStockCount}</h2>
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
            {report.recentInvoices.map((item) => (
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



// right one 
// import { useEffect, useState } from "react";
// import API from "../../config/api";
// import "../../assets/css/reports.css";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// function Reports() {
//   const [report, setReport] = useState({
//     totalCustomers: 0,
//     totalProducts: 0,
//     totalInvoices: 0,
//     totalRevenue: 0,
//     lowStockCount: 0,
//     monthlyRevenue: [],
//     topProducts: [],
//     recentInvoices: [],
//   });

//   const token = localStorage.getItem("token");

//   const fetchReport = async () => {
//     try {
//       const res = await API.get("/reports/dashboard", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setReport(res.data);
//     } catch (error) {
//       console.log("REPORT ERROR:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//   return (
//     <div className="page-container">
//       <h1>Reports Dashboard</h1>

//       <div className="reports-grid">
//         <div className="card">
//           <h3>Customers</h3>
//           <h2>{report.totalCustomers}</h2>
//         </div>

//         <div className="card">
//           <h3>Products</h3>
//           <h2>{report.totalProducts}</h2>
//         </div>

//         <div className="card">
//           <h3>Invoices</h3>
//           <h2>{report.totalInvoices}</h2>
//         </div>

//         <div className="card">
//           <h3>Total Revenue</h3>
//           <h2>₹{report.totalRevenue}</h2>
//         </div>
//       </div>

//       <div className="charts-grid">
//         <div className="card">
//           <h3>Monthly Revenue</h3>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={report.monthlyRevenue}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="revenue" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="card">
//           <h3>Top Products</h3>

//           <ResponsiveContainer width="100%" height={320}>
//             <PieChart>
//               <Pie
//                 data={report.topProducts || []}
//                 dataKey="totalSold"
//                 nameKey="product_name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={120}
//                 innerRadius={40}
//                 paddingAngle={3}
//               >
//                 {(report.topProducts || []).map((_, index) => (
//                   <Cell
//                     key={index}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>

//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="card mt-20">
//         <h3>Low Stock Items</h3>
//         <h2>{report.lowStockCount}</h2>
//       </div>

//       <div className="card mt-20">
//         <h3>Recent Invoices</h3>

//         <table className="report-table">
//           <thead>
//             <tr>
//               <th>Invoice No</th>
//               <th>Customer</th>
//               <th>Total</th>
//             </tr>
//           </thead>

//           <tbody>
//             {report.recentInvoices.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.invoice_number}</td>
//                 <td>{item.customer_name}</td>
//                 <td>₹{item.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Reports;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/reports.css";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// function Reports() {
//   const [report, setReport] = useState({
//     totalCustomers: 0,
//     totalProducts: 0,
//     totalInvoices: 0,
//     totalRevenue: 0,
//     lowStockCount: 0,
//     monthlyRevenue: [],
//     topProducts: [],
//     recentInvoices: [],
//   });

//   const token = localStorage.getItem("token");

//   const fetchReport = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API || "http://localhost:5001"}/api/reports/dashboard`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setReport(res.data);
//     } catch (error) {
//       console.log("REPORT ERROR:", error);

//       if (error.response) {
//         console.log(error.response.data);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//   return (
//     <div className="page-container">
//       <h1>Reports Dashboard</h1>

//       <div className="reports-grid">
//         <div className="card">
//           <h3>Customers</h3>
//           <h2>{report.totalCustomers}</h2>
//         </div>

//         <div className="card">
//           <h3>Products</h3>
//           <h2>{report.totalProducts}</h2>
//         </div>

//         <div className="card">
//           <h3>Invoices</h3>
//           <h2>{report.totalInvoices}</h2>
//         </div>

//         <div className="card">
//           <h3>Total Revenue</h3>
//           <h2>₹{report.totalRevenue}</h2>
//         </div>
//       </div>

//       <div className="charts-grid">
//         <div className="card">
//           <h3>Monthly Revenue</h3>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={report.monthlyRevenue}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="revenue" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="card">
//           <h3>Top Products</h3>

//           <ResponsiveContainer width="100%" height={320}>
//             <PieChart>
//               <Pie
//                 data={report.topProducts || []}
//                 dataKey="totalSold"
//                 nameKey="product_name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={120}
//                 innerRadius={40}
//                 paddingAngle={3}
//                 labelLine={false}
//                 label={({ name, value }) =>
//                   value ? `${name} (${value})` : name
//                 }
//               >
//                 {(report.topProducts || []).map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                     stroke="#ffffff"
//                     strokeWidth={2}
//                   />
//                 ))}
//               </Pie>

//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="card mt-20">
//         <h3>Low Stock Items</h3>
//         <h2>{report.lowStockCount}</h2>
//       </div>

//       <div className="card mt-20">
//         <h3>Recent Invoices</h3>

//         <table className="report-table">
//           <thead>
//             <tr>
//               <th>Invoice No</th>
//               <th>Customer</th>
//               <th>Total</th>
//             </tr>
//           </thead>

//           <tbody>
//             {(report.recentInvoices || []).map((item) => (
//               <tr key={item.id}>
//                 <td>{item.invoice_number}</td>
//                 <td>{item.customer_name}</td>
//                 <td>₹{item.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Reports;

