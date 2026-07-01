// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import API from "../config/api";
// // import "../assets/css/subscription.css";

// // function Subscription() {
// //   const token = localStorage.getItem("token");

// //   const [subscription, setSubscription] = useState({
// //     subscription_type: "FREE",
// //     subscription_expiry: null,
// //   });

// //   useEffect(() => {
// //     loadSubscription();
// //   }, []);

// //   const loadSubscription = async () => {
// //     try {
// //       const res = await axios.get(
// //         `${API}/subscription/current`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setSubscription(res.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   const buyPlan = async (plan) => {
// //     try {
// //       const { data } = await axios.post(
// //         `${API}/subscription/create-order`,
// //         { plan },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const options = {
// //         key: data.key,

// //         order_id: data.id,

// //         amount: data.amount,

// //         currency: data.currency,

// //         name: "ShalizaSoft",

// //         description: `${plan} Premium Plan`,

// //         image: "/logo192.png",

// //         handler: async function (response) {
// //           try {
// //             await axios.post(
// //               `${API}/subscription/verify-payment`,
// //               {
// //                 razorpay_order_id:
// //                   response.razorpay_order_id,

// //                 razorpay_payment_id:
// //                   response.razorpay_payment_id,

// //                 razorpay_signature:
// //                   response.razorpay_signature,

// //                 plan,
// //               },
// //               {
// //                 headers: {
// //                   Authorization: `Bearer ${token}`,
// //                 },
// //               }
// //             );

// //             alert("🎉 Premium Activated");

// //             loadSubscription();
// //           } catch (err) {
// //             console.log(err);

// //             alert(
// //               err.response?.data?.message ||
// //                 "Payment Verification Failed"
// //             );
// //           }
// //         },

// //         prefill: {
// //           name: data.user.name,

// //           email: data.user.email,

// //           contact: data.user.contact,
// //         },

// //         notes: {
// //           plan,
// //           software: "ShalizaSoft",
// //         },

// //         theme: {
// //           color: "#2563eb",
// //         },

// //         modal: {
// //           ondismiss: function () {
// //             console.log("Checkout Closed");
// //           },
// //         },

// //         retry: {
// //           enabled: true,
// //           max_count: 3,
// //         },

// //         remember_customer: true,
// //       };

// //       const razorpay = new window.Razorpay(options);

// //       razorpay.open();
// //     } catch (err) {
// //       console.log(err);

// //       alert(
// //         err.response?.data?.message ||
// //           "Unable to create payment."
// //       );
// //     }
// //   };

// //   return (
// //     <div className="subscription-page">
// //       <h1 className="subscription-title">
// //         🚀 Upgrade Your Business
// //       </h1>

// //       <div className="current-plan">
// //         <h3>
// //           Current Plan : {subscription.subscription_type}
// //         </h3>

// //         {subscription.subscription_expiry && (
// //           <p>
// //             Expiry :{" "}
// //             {new Date(
// //               subscription.subscription_expiry
// //             ).toLocaleDateString()}
// //           </p>
// //         )}
// //       </div>

// //       <div className="plan-grid">
// //         <div className="plan-card">
// //           <h2>FREE</h2>

// //           <div className="plan-price">
// //             ₹0
// //           </div>

// //           <ul>
// //             <li>Basic Billing</li>
// //             <li>Customer Management</li>
// //             <li>Invoice PDF</li>
// //           </ul>
// //         </div>

// //         <div className="plan-card premium-card">
// //           <h2>PREMIUM MONTHLY</h2>

// //           <div className="plan-price">
// //             ₹299
// //           </div>

// //           <ul>
// //             <li>Unlimited Customers</li>
// //             <li>Unlimited Products</li>
// //             <li>Unlimited Invoices</li>
// //             <li>Premium Invoice PDF</li>
// //             <li>Reports</li>
// //             <li>Inventory</li>
// //             <li>AI Features</li>
// //             <li>Priority Support</li>
// //           </ul>

// //           <button
// //             className="plan-btn"
// //             onClick={() => buyPlan("MONTHLY")}
// //           >
// //             Buy Monthly
// //           </button>
// //         </div>

// //         <div className="plan-card premium-card">
// //           <h2>PREMIUM YEARLY</h2>

// //           <div className="plan-price">
// //             ₹2999
// //           </div>

// //           <ul>
// //             <li>Everything Included</li>
// //             <li>2 Months Free</li>
// //             <li>Priority Support</li>
// //             <li>Future Updates</li>
// //           </ul>

// //           <button
// //             className="plan-btn"
// //             onClick={() => buyPlan("YEARLY")}
// //           >
// //             Buy Yearly
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Subscription;   


// import { useEffect, useState } from "react";
// import API from "../config/api";
// import "../assets/css/subscription.css";

// function Subscription() {
//   const token = localStorage.getItem("token");

//   const [subscription, setSubscription] = useState({
//     subscription_type: "FREE",
//     subscription_expiry: null,
//   });

//   useEffect(() => {
//     loadSubscription();
//   }, []);

//   const loadSubscription = async () => {
//     try {
//       const res = await API.get("/subscription/current", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSubscription(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const buyPlan = async (plan) => {
//     try {
//       const { data } = await API.post(
//         "/subscription/create-order",
//         { plan },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!window.Razorpay) {
//         alert("Razorpay SDK not loaded");
//         return;
//       }

//       const options = {
//         key: data.key,
//         order_id: data.id,
//         amount: data.amount,
//         currency: data.currency,

//         name: "ShalizaSoft",
//         description: `${plan} Plan`,

//         handler: async function (response) {
//           try {
//             await API.post(
//               "/subscription/verify-payment",
//               {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 plan,
//               },
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );

//             alert("Payment Success");
//             loadSubscription();
//           } catch (err) {
//             console.log(err);
//           }
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Subscription</h1>

//       <p>Current Plan: {subscription.subscription_type}</p>

//       <button onClick={() => buyPlan("MONTHLY")}>
//         Monthly
//       </button>

//       <button onClick={() => buyPlan("YEARLY")}>
//         Yearly
//       </button>
//     </div>
//   );
// }

// export default Subscription;

// // working one 
// import { useState, useEffect } from "react";
// import API from "../config/api";
// import axios from "axios";

// function Subscription() {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   const createOrder = async (plan) => {
//     try {
//       setLoading(true);

//       const res = await API.post(
//         "/subscription/create-order",
//         { plan },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const options = {
//         key: res.data.key,
//         amount: res.data.amount,
//         currency: "INR",
//         name: "Shaliza Billing",
//         order_id: res.data.id,
//         handler: async function (response) {
//           await API.post(
//             "/subscription/verify-payment",
//             {
//               ...response,
//               plan,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           alert("Payment Successful");
//         },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => createOrder("MONTHLY")}>
//         Buy Monthly
//       </button>

//       <button onClick={() => createOrder("YEARLY")}>
//         Buy Yearly
//       </button>
//     </div>
//   );
// }

// export default Subscription;

import { useState } from "react";
import API from "../config/api";

function Subscription() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const createOrder = async (plan) => {
    try {
      setLoading(true);

      const res = await API.post(
        "/subscription/create-order",
        { plan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: "INR",
        name: "Shaliza Billing",
        order_id: res.data.id,
        handler: async function (response) {
          await API.post(
            "/subscription/verify-payment",
            {
              ...response,
              plan,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          alert("Payment Successful");
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#1e293b",
            marginBottom: "10px",
          }}
        >
          🚀 Upgrade Your Business
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px",
            marginBottom: "45px",
          }}
        >
          Unlock premium tools to grow your business faster.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "30px",
          }}
        >
          {/* MONTHLY */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "35px",
              boxShadow: "0 15px 40px rgba(0,0,0,.08)",
              transition: ".3s",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 18px",
                background: "#2563eb",
                color: "#fff",
                borderRadius: "50px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              MOST POPULAR
            </div>

            <h2
              style={{
                fontSize: "30px",
                color: "#1e293b",
              }}
            >
              Monthly
            </h2>

            <h1
              style={{
                fontSize: "52px",
                color: "#2563eb",
                margin: "20px 0",
              }}
            >
              ₹299
            </h1>

            <p style={{ color: "#64748b" }}>
              Per Month
            </p>

            <hr
              style={{
                margin: "30px 0",
                border: "none",
                borderTop: "1px solid #eee",
              }}
            />

            <div
              style={{
                textAlign: "left",
                lineHeight: "40px",
                color: "#334155",
                fontSize: "16px",
              }}
            >
              ✅ Unlimited Customers<br />
              ✅ Unlimited Products<br />
              ✅ Unlimited Invoices<br />
              ✅ Reports Dashboard<br />
              ✅ Inventory Management<br />
              ✅ Premium PDF Invoice<br />
              ✅ AI Features<br />
              ✅ Priority Support
            </div>

            <button
              disabled={loading}
              onClick={() => createOrder("MONTHLY")}
              style={{
                width: "100%",
                marginTop: "35px",
                padding: "16px",
                border: "none",
                borderRadius: "12px",
                background: "#2563eb",
                color: "#fff",
                fontSize: "17px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {loading ? "Processing..." : "Buy Monthly"}
            </button>
          </div>

          {/* YEARLY */}
          <div
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#4f46e5)",
              borderRadius: "20px",
              padding: "35px",
              color: "#fff",
              boxShadow: "0 15px 40px rgba(37,99,235,.25)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 18px",
                background: "#fff",
                color: "#2563eb",
                borderRadius: "50px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              BEST VALUE
            </div>

            <h2
              style={{
                fontSize: "30px",
              }}
            >
              Yearly
            </h2>

            <h1
              style={{
                fontSize: "52px",
                margin: "20px 0",
              }}
            >
              ₹2999
            </h1>

            <p>Only ₹249/month</p>

            <hr
              style={{
                margin: "30px 0",
                border: "none",
                borderTop: "1px solid rgba(255,255,255,.3)",
              }}
            />

            <div
              style={{
                textAlign: "left",
                lineHeight: "40px",
                fontSize: "16px",
              }}
            >
              ✅ Everything in Monthly<br />
              ✅ Save ₹589 Every Year<br />
              ✅ Free Future Updates<br />
              ✅ Premium Support<br />
              ✅ AI Features<br />
              ✅ Reports Dashboard<br />
              ✅ Inventory Management<br />
              ✅ Best for Growing Businesses
            </div>

            <button
              disabled={loading}
              onClick={() => createOrder("YEARLY")}
              style={{
                width: "100%",
                marginTop: "35px",
                padding: "16px",
                border: "none",
                borderRadius: "12px",
                background: "#fff",
                color: "#2563eb",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {loading ? "Processing..." : "Buy Yearly"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;