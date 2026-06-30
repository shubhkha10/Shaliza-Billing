// import { useEffect, useState } from "react";
// import axios from "axios";
// import API from "../config/api";

// function Payments() {
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     loadPayments();
//   }, []);

//   const loadPayments = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const res = await axios.get(
//         `${API}/subscription/payments`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setPayments(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="page-container">
//       <h1>Payment History</h1>

//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Plan</th>
//             <th>Amount</th>
//             <th>Method</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {payments.map((p) => (
//             <tr key={p.id}>
//               <td>{new Date(p.paid_at).toLocaleString()}</td>
//               <td>{p.plan}</td>
//               <td>
//                 {p.currency} {p.amount}
//               </td>
//               <td>{p.payment_method}</td>
//               <td>{p.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Payments;


import { useEffect, useState } from "react";
import API from "../config/api";

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await API.get("/subscription/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPayments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-container">
      <h1>Payment History</h1>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{new Date(p.paid_at).toLocaleString()}</td>
              <td>{p.plan}</td>
              <td>
                {p.currency} {p.amount}
              </td>
              <td>{p.payment_method}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;