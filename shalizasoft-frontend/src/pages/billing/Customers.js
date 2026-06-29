// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/customers.css";
// import { useNavigate } from "react-router-dom";

// const API = "https://shaliza-billing-production.up.railway.app/api";

// function Customers() {
//   const [customers, setCustomers] = useState([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [search, setSearch] = useState("");

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const fetchCustomers = async () => {
//     try {
//       const res = await axios.get(`${API}/customers`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setCustomers(res.data);
//     } catch (error) {
//       console.log("FETCH ERROR:", error);

//       if (error.response?.status === 403) {
//         alert(error.response?.data?.message || "Plan Limit Reached");
//         navigate("/subscription");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const addCustomer = async () => {
//     try {
//       if (!name) return alert("Customer Name Required");

//       await axios.post(
//         `${API}/customers`,
//         { name, email, phone },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setName("");
//       setEmail("");
//       setPhone("");

//       fetchCustomers();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteCustomer = async (id) => {
//     try {
//       await axios.delete(`${API}/customers/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       fetchCustomers();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filteredCustomers = customers.filter((c) =>
//     c.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="customer-container">
//       <h1>👤 Customers</h1>

//       <input
//         placeholder="Search"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div>
//         <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//         <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

//         <button onClick={addCustomer}>Add Customer</button>
//       </div>

//       <table>
//         <tbody>
//           {filteredCustomers.map((c) => (
//             <tr key={c.id}>
//               <td>{c.name}</td>
//               <td>{c.email || "-"}</td>
//               <td>{c.phone || "-"}</td>
//               <td>
//                 <button onClick={() => deleteCustomer(c.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Customers;

import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/api";
import "../../assets/css/customers.css";
import { useNavigate } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API}/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCustomers(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async () => {
    try {
      await axios.post(
        `${API}/customers`,
        { name, email, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setName("");
      setEmail("");
      setPhone("");
      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (id) => {
    await axios.delete(`${API}/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchCustomers();
  };

  const filteredCustomers = customers.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customer-container">
      <h1>Customers</h1>

      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <button onClick={addCustomer}>Add</button>

      <table>
        <tbody>
          {filteredCustomers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={() => deleteCustomer(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;