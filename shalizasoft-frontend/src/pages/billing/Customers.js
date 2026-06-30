// import { useEffect, useState } from "react";
// import axios from "axios";
// import API from "../../config/api";
// import "../../assets/css/customers.css";
// import { useNavigate } from "react-router-dom";

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

//       const res = await axios.get(
//         `${API}/customers`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCustomers(res.data);

//     } catch (error) {

//       console.log("FETCH ERROR:", error);

//       if (error.response?.status === 403) {

//         alert(
//           error.response?.data?.message ||
//           "Free Plan Limit Reached"
//         );

//         navigate("/subscription");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const addCustomer = async () => {

//     try {

//       if (!name) {
//         alert("Customer Name Required");
//         return;
//       }

//       await axios.post(
//         `${API}/customers`,
//         {
//           name,
//           email,
//           phone,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setName("");
//       setEmail("");
//       setPhone("");

//       fetchCustomers();

//     } catch (error) {

//       console.log(
//         "STATUS:",
//         error.response?.status
//       );

//       console.log(
//         "RESPONSE DATA:",
//         error.response?.data
//       );

//       if (
//         error.response?.data?.code ===
//         "PLAN_LIMIT"
//       ) {

//         const upgrade = window.confirm(
//           error.response.data.message +
//           "\n\nGo To Premium Plans?"
//         );

//         if (upgrade) {
//           navigate("/subscription");
//         }

//         return;
//       }

//       if (
//         error.response?.status === 403
//       ) {

//         alert(
//           error.response?.data?.message ||
//           "Free Plan Limit Reached. Upgrade To Premium."
//         );

//         navigate("/subscription");

//         return;
//       }

//       alert(
//         error.response?.data?.message ||
//         "Something Went Wrong"
//       );
//     }
//   };

//   const deleteCustomer = async (id) => {

//     try {

//       await axios.delete(
//         `${API}/customers/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       fetchCustomers();

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filteredCustomers = customers.filter(
//     (c) =>
//       c.name
//         ?.toLowerCase()
//         .includes(search.toLowerCase())
//   );

//   return (
//     <div className="customer-container">

//       <h1 className="title">
//         👤 Customers
//       </h1>

//       <input
//         type="text"
//         placeholder="🔍 Search customer..."
//         value={search}
//         onChange={(e) =>
//           setSearch(e.target.value)
//         }
//         style={{
//           padding: "10px",
//           marginBottom: "15px",
//           width: "300px",
//           border: "1px solid #ddd",
//           borderRadius: "6px",
//         }}
//       />

//       <div className="customer-form">

//         <input
//           type="text"
//           placeholder="Customer Name *"
//           value={name}
//           onChange={(e) =>
//             setName(e.target.value)
//           }
//         />

//         <input
//           type="email"
//           placeholder="Email (optional)"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//         />

//         <input
//           type="text"
//           placeholder="Phone (optional)"
//           value={phone}
//           onChange={(e) =>
//             setPhone(e.target.value)
//           }
//         />

//         <button onClick={addCustomer}>
//           + Add Customer
//         </button>

//       </div>

//       <div className="table-card">

//         <table>

//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredCustomers.length > 0 ? (

//               filteredCustomers.map((c) => (
//                 <tr key={c.id}>
//                   <td>{c.name}</td>
//                   <td>{c.email || "-"}</td>
//                   <td>{c.phone || "-"}</td>
//                   <td>
//                     <button
//                       onClick={() =>
//                         deleteCustomer(c.id)
//                       }
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))

//             ) : (

//               <tr>
//                 <td
//                   colSpan="4"
//                   style={{
//                     textAlign: "center",
//                   }}
//                 >
//                   No Customers Found
//                 </td>
//               </tr>

//             )}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }

// export default Customers;


import { useEffect, useState } from "react";
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

      const res = await API.get("/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(res.data);

    } catch (error) {

      console.log("FETCH ERROR:", error);

      if (error.response?.status === 403) {
        alert(
          error.response?.data?.message ||
          "Free Plan Limit Reached"
        );
        navigate("/subscription");
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async () => {

    try {

      if (!name) {
        alert("Customer Name Required");
        return;
      }

      await API.post("/customers",
        {
          name,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setEmail("");
      setPhone("");

      fetchCustomers();

    } catch (error) {

      console.log("STATUS:", error.response?.status);
      console.log("RESPONSE DATA:", error.response?.data);

      if (error.response?.data?.code === "PLAN_LIMIT") {
        const upgrade = window.confirm(
          error.response.data.message +
          "\n\nGo To Premium Plans?"
        );

        if (upgrade) navigate("/subscription");

        return;
      }

      if (error.response?.status === 403) {
        alert(
          error.response?.data?.message ||
          "Free Plan Limit Reached. Upgrade To Premium."
        );
        navigate("/subscription");
        return;
      }

      alert(
        error.response?.data?.message ||
        "Something Went Wrong"
      );
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await API.delete(`/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCustomers();

    } catch (error) {
      console.log(error);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customer-container">

      <h1 className="title">👤 Customers</h1>

      <input
        type="text"
        placeholder="🔍 Search customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "15px",
          width: "300px",
          border: "1px solid #ddd",
          borderRadius: "6px",
        }}
      />

      <div className="customer-form">

        <input
          type="text"
          placeholder="Customer Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={addCustomer}>
          + Add Customer
        </button>

      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email || "-"}</td>
                  <td>{c.phone || "-"}</td>
                  <td>
                    <button onClick={() => deleteCustomer(c.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Customers;