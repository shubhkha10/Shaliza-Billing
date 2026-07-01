// import axios from "axios";
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
//       const res = await axios.get(
//         `${API}/subscription/current`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSubscription(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const buyPlan = async (plan) => {
//     try {
//       const { data } = await axios.post(
//         `${API}/subscription/create-order`,
//         { plan },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const options = {
//         key: data.key,

//         order_id: data.id,

//         amount: data.amount,

//         currency: data.currency,

//         name: "ShalizaSoft",

//         description: `${plan} Premium Plan`,

//         image: "/logo192.png",

//         handler: async function (response) {
//           try {
//             await axios.post(
//               `${API}/subscription/verify-payment`,
//               {
//                 razorpay_order_id:
//                   response.razorpay_order_id,

//                 razorpay_payment_id:
//                   response.razorpay_payment_id,

//                 razorpay_signature:
//                   response.razorpay_signature,

//                 plan,
//               },
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );

//             alert("🎉 Premium Activated");

//             loadSubscription();
//           } catch (err) {
//             console.log(err);

//             alert(
//               err.response?.data?.message ||
//                 "Payment Verification Failed"
//             );
//           }
//         },

//         prefill: {
//           name: data.user.name,

//           email: data.user.email,

//           contact: data.user.contact,
//         },

//         notes: {
//           plan,
//           software: "ShalizaSoft",
//         },

//         theme: {
//           color: "#2563eb",
//         },

//         modal: {
//           ondismiss: function () {
//             console.log("Checkout Closed");
//           },
//         },

//         retry: {
//           enabled: true,
//           max_count: 3,
//         },

//         remember_customer: true,
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.open();
//     } catch (err) {
//       console.log(err);

//       alert(
//         err.response?.data?.message ||
//           "Unable to create payment."
//       );
//     }
//   };

//   return (
//     <div className="subscription-page">
//       <h1 className="subscription-title">
//         🚀 Upgrade Your Business
//       </h1>

//       <div className="current-plan">
//         <h3>
//           Current Plan : {subscription.subscription_type}
//         </h3>

//         {subscription.subscription_expiry && (
//           <p>
//             Expiry :{" "}
//             {new Date(
//               subscription.subscription_expiry
//             ).toLocaleDateString()}
//           </p>
//         )}
//       </div>

//       <div className="plan-grid">
//         <div className="plan-card">
//           <h2>FREE</h2>

//           <div className="plan-price">
//             ₹0
//           </div>

//           <ul>
//             <li>Basic Billing</li>
//             <li>Customer Management</li>
//             <li>Invoice PDF</li>
//           </ul>
//         </div>

//         <div className="plan-card premium-card">
//           <h2>PREMIUM MONTHLY</h2>

//           <div className="plan-price">
//             ₹299
//           </div>

//           <ul>
//             <li>Unlimited Customers</li>
//             <li>Unlimited Products</li>
//             <li>Unlimited Invoices</li>
//             <li>Premium Invoice PDF</li>
//             <li>Reports</li>
//             <li>Inventory</li>
//             <li>AI Features</li>
//             <li>Priority Support</li>
//           </ul>

//           <button
//             className="plan-btn"
//             onClick={() => buyPlan("MONTHLY")}
//           >
//             Buy Monthly
//           </button>
//         </div>

//         <div className="plan-card premium-card">
//           <h2>PREMIUM YEARLY</h2>

//           <div className="plan-price">
//             ₹2999
//           </div>

//           <ul>
//             <li>Everything Included</li>
//             <li>2 Months Free</li>
//             <li>Priority Support</li>
//             <li>Future Updates</li>
//           </ul>

//           <button
//             className="plan-btn"
//             onClick={() => buyPlan("YEARLY")}
//           >
//             Buy Yearly
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Subscription;

import { useEffect, useState } from "react";
import API from "../config/api";
import "../assets/css/subscription.css";

function Subscription() {
  const token = localStorage.getItem("token");

  const [subscription, setSubscription] = useState({
    subscription_type: "FREE",
    subscription_expiry: null,
  });

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const res = await API.get("/subscription/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubscription(res.data);
    } catch (err) {
      console.log("LOAD SUB ERROR:", err);
    }
  };

  // =========================
  // BUY PLAN (FIXED)
  // =========================
  const buyPlan = async (plan) => {
    try {
      const { data } = await API.post(
        "/subscription/create-order",
        { plan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: data.key,
        order_id: data.id, // ✅ FIXED
        amount: data.amount,
        currency: data.currency,

        name: "ShalizaSoft",
        description: `${plan} Premium Plan`,
        image: "/logo192.png",

        handler: async function (response) {
          try {
            await API.post(
              "/subscription/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("🎉 Premium Activated Successfully");

            loadSubscription();
          } catch (err) {
            console.log("VERIFY ERROR:", err);
            alert(
              err.response?.data?.message ||
                "Payment Verification Failed"
            );
          }
        },

        prefill: {
          name: data.user?.name || "",
          email: data.user?.email || "",
          contact: data.user?.contact || "",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.log("CREATE ORDER ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Unable to create payment"
      );
    }
  };

  return (
    <div className="subscription-page">
      <h1 className="subscription-title">
        🚀 Upgrade Your Business
      </h1>

      <div className="current-plan">
        <h3>
          Current Plan: {subscription.subscription_type}
        </h3>

        {subscription.subscription_expiry && (
          <p>
            Expiry:{" "}
            {new Date(
              subscription.subscription_expiry
            ).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="plan-grid">
        <div className="plan-card">
          <h2>FREE</h2>
          <div className="plan-price">₹0</div>
        </div>

        <div className="plan-card premium-card">
          <h2>MONTHLY</h2>
          <div className="plan-price">₹299</div>

          <button onClick={() => buyPlan("MONTHLY")}>
            Buy Monthly
          </button>
        </div>

        <div className="plan-card premium-card">
          <h2>YEARLY</h2>
          <div className="plan-price">₹2999</div>

          <button onClick={() => buyPlan("YEARLY")}>
            Buy Yearly
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subscription;