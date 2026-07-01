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
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const db = require("../config/db");

// ================================
// SAFE RAZORPAY INIT
// ================================
const getRazorpay = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error("Razorpay env variables missing");
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
};

// ================================
// CREATE ORDER
// ================================
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    let { plan } = req.body;

    if (!plan) plan = "MONTHLY";

    let amount = 29900; // ₹299

    if (plan === "YEARLY") {
      amount = 299900; // ₹2999
    }

    const razorpay = getRazorpay();

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        user_id: userId,
        plan,
      },
    });

    const [users] = await db.promise().query(
      "SELECT name, email FROM users WHERE id = ?",
      [userId]
    );

    const user = users[0] || {};

    return res.json({
      ...order,
      key: process.env.RAZORPAY_KEY_ID,
      user: {
        name: user.name || "",
        email: user.email || "",
        contact: "",
      },
    });

  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
};

// ================================
// VERIFY PAYMENT
// ================================
exports.verifyPayment = async (req, res) => {
  try {
    const userId = req.user.id;

    const razorpay = getRazorpay();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    const expiryDate = new Date();

    let amount = 299;
    let planName = "MONTHLY";

    if (plan === "YEARLY") {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      amount = 2999;
      planName = "YEARLY";
    } else {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    }

    await db.promise().query(
      `
      UPDATE users
      SET subscription_type='PREMIUM',
          subscription_expiry=?
      WHERE id=?
      `,
      [expiryDate, userId]
    );

    await db.promise().query(
      `
      INSERT INTO payments (
        user_id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        plan,
        currency,
        payment_method,
        email,
        contact,
        status,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        planName,
        (payment.currency || "INR").toUpperCase(),
        payment.method || "",
        payment.email || "",
        payment.contact || "",
        (payment.status || "SUCCESS").toUpperCase(),
        JSON.stringify(payment),
      ]
    );

    return res.json({
      success: true,
      message: "Premium Activated Successfully",
      expiry: expiryDate,
    });

  } catch (error) {
    console.log("VERIFY PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

// ================================
// GET SUBSCRIPTION
// ================================
exports.getSubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const [result] = await db.promise().query(
      `SELECT subscription_type, subscription_expiry FROM users WHERE id=?`,
      [userId]
    );

    return res.json(
      result[0] || {
        subscription_type: "FREE",
        subscription_expiry: null,
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch subscription",
    });
  }
};

// ================================
// PAYMENT HISTORY
// ================================
exports.getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const [payments] = await db.promise().query(
      `SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    return res.json(payments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to fetch payment history",
    });
  }
};

// ================================
// PAYMENT SUMMARY
// ================================
exports.getPaymentSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [[summary]] = await db.promise().query(
      `
      SELECT
        COUNT(*) AS totalPayments,
        IFNULL(SUM(amount),0) AS totalSpent,
        MAX(created_at) AS lastPayment
      FROM payments
      WHERE user_id=?
      `,
      [userId]
    );

    const [[subscription]] = await db.promise().query(
      `
      SELECT subscription_type, subscription_expiry
      FROM users WHERE id=?
      `,
      [userId]
    );

    return res.json({
      ...summary,
      subscription_type: subscription.subscription_type,
      subscription_expiry: subscription.subscription_expiry,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to fetch summary",
    });
  }
};