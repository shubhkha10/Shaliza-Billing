// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const db = require("../config/db");

// // IMPORTANT: lazy initialization (fix crash)
// const getRazorpay = () => {
//   if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//     throw new Error("Razorpay env variables missing");
//   }

//   return new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
//   });
// };

// // ===================================
// // CREATE ORDER
// // ===================================
// exports.createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { plan } = req.body;

//     let amount = 29900;

//     if (plan === "YEARLY") {
//       amount = 299900;
//     }

//    const razorpay = getRazorpay();

// const order = await razorpay.orders.create({
//       amount,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//       payment_capture: 1,
//       notes: {
//         user_id: userId,
//         plan,
//       },
//     });

//     const [users] = await db.promise().query(
//       `
//       SELECT
//       name,
//       email
//       FROM users
//       WHERE id = ?
//       `,
//       [userId]
//     );

//     const user = users[0] || {};

//     res.json({
//       ...order,
//       key: process.env.RAZORPAY_KEY_ID,

//       user: {
//         name: user.name || "",
//         email: user.email || "",
//         contact: "",
//       },
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Order creation failed",
//     });
//   }
// };

// // ===================================
// // VERIFY PAYMENT
// // ===================================

// exports.verifyPayment = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const razorpay = getRazorpay(); // ✅ FIX ADDED

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       plan,
//     } = req.body;

//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         message: "Invalid Payment Signature",
//       });
//     }

//     const payment = await razorpay.payments.fetch(razorpay_payment_id);

//     const expiryDate = new Date();

//     let amount = 299;
//     let planName = "MONTHLY";

//     if (plan === "YEARLY") {
//       expiryDate.setFullYear(expiryDate.getFullYear() + 1);
//       amount = 2999;
//       planName = "YEARLY";
//     } else {
//       expiryDate.setMonth(expiryDate.getMonth() + 1);
//     }

//     await db.promise().query(
//       `
//       UPDATE users
//       SET subscription_type='PREMIUM',
//           subscription_expiry=?
//       WHERE id=?
//       `,
//       [expiryDate, userId]
//     );

//     await db.promise().query(
//       `
//       INSERT INTO payments (
//         user_id,
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         amount,
//         plan,
//         currency,
//         payment_method,
//         email,
//         contact,
//         status,
//         notes
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `,
//       [
//         userId,
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         amount,
//         planName,
//         (payment.currency || "INR").toUpperCase(),
//         payment.method || "",
//         payment.email || "",
//         payment.contact || "",
//         (payment.status || "SUCCESS").toUpperCase(),
//         JSON.stringify(payment),
//       ]
//     );

//     res.json({
//       success: true,
//       message: "Premium Activated Successfully",
//       expiry: expiryDate,
//     });

//   } catch (error) {
//     console.log("VERIFY PAYMENT ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: "Payment Verification Failed",
//     });
//   }
// };



// // exports.verifyPayment = async (req, res) => {
// //   const userId = req.user.id;

// //   try {
// //     const {
// //       razorpay_order_id,
// //       razorpay_payment_id,
// //       razorpay_signature,
// //       plan,
// //     } = req.body;

// //     const generatedSignature = crypto
// //       .createHmac(
// //         "sha256",
// //         process.env.RAZORPAY_KEY_SECRET
// //       )
// //       .update(
// //         razorpay_order_id +
// //           "|" +
// //           razorpay_payment_id
// //       )
// //       .digest("hex");

// //     if (
// //       generatedSignature !==
// //       razorpay_signature
// //     ) {
// //       return res.status(400).json({
// //         message: "Invalid Payment Signature",
// //       });
// //     }

// //     const payment =
// //       await razorpay.payments.fetch(
// //         razorpay_payment_id
// //       );

// //     const expiryDate = new Date();

// //     let amount = 299;
// //     let planName = "MONTHLY";

// //     if (plan === "YEARLY") {
// //       expiryDate.setFullYear(
// //         expiryDate.getFullYear() + 1
// //       );

// //       amount = 2999;
// //       planName = "YEARLY";
// //     } else {
// //       expiryDate.setMonth(
// //         expiryDate.getMonth() + 1
// //       );
// //     }

//     // Update User Subscription

//     await db.promise().query(
//       `
//       UPDATE users
//       SET
//       subscription_type='PREMIUM',
//       subscription_expiry=?
//       WHERE id=?
//       `,
//       [
//         expiryDate,
//         userId,
//       ]
//     );

//     // Save Payment

//     await db.promise().query(
//       `
//       INSERT INTO payments
//       (
//         user_id,
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         amount,
//         plan,
//         currency,
//         payment_method,
//         email,
//         contact,
//         status,
//         notes
//       )
//       VALUES
//       (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `,
//       [
//         userId,
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         amount,
//         planName,
//         (payment.currency || "INR").toUpperCase(),
//         payment.method || "",
//         payment.email || "",
//         payment.contact || "",
//         (payment.status || "SUCCESS").toUpperCase(),
//         JSON.stringify(payment),
//       ]
//     );

//     res.json({
//       success: true,
//       message:
//         "Premium Activated Successfully",
//       expiry: expiryDate,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message:
//         "Payment Verification Failed",
//     });
//   }
// };

// // ===================================
// // CURRENT SUBSCRIPTION
// // ===================================
// exports.getSubscription = async (
//   req,
//   res
// ) => {
//   try {
//     const userId = req.user.id;

//     const [result] =
//       await db.promise().query(
//         `
//         SELECT
//         subscription_type,
//         subscription_expiry
//         FROM users
//         WHERE id=?
//         `,
//         [userId]
//       );

//     res.json(
//       result[0] || {
//         subscription_type: "FREE",
//         subscription_expiry: null,
//       }
//     );
//   } catch (error) {
//     console.log(error);

//     res.status(500).json(error);
//   }
// };
// // ===================================
// // PAYMENT HISTORY
// // ===================================
// exports.getPaymentHistory = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const [payments] = await db.promise().query(
//       `
//       SELECT
//         id,
//         plan,
//         amount,
//         currency,
//         payment_method,
//         status,
//         razorpay_payment_id,
//         created_at,
//         paid_at
//       FROM payments
//       WHERE user_id = ?
//       ORDER BY created_at DESC
//       `,
//       [userId]
//     );

//     res.json(payments);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Failed to fetch payment history",
//     });
//   }
// };

// // ===================================
// // PAYMENT SUMMARY
// // ===================================
// exports.getPaymentSummary = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const [[summary]] = await db.promise().query(
//       `
//       SELECT
//         COUNT(*) AS totalPayments,
//         IFNULL(SUM(amount),0) AS totalSpent,
//         MAX(created_at) AS lastPayment
//       FROM payments
//       WHERE user_id=?
//       `,
//       [userId]
//     );

//     const [[subscription]] = await db.promise().query(
//       `
//       SELECT
//         subscription_type,
//         subscription_expiry
//       FROM users
//       WHERE id=?
//       `,
//       [userId]
//     );

//     res.json({
//       totalPayments: summary.totalPayments,
//       totalSpent: summary.totalSpent,
//       lastPayment: summary.lastPayment,
//       subscription_type: subscription.subscription_type,
//       subscription_expiry: subscription.subscription_expiry,
//     });
//   } catch (err) {
//     console.log(err);

//     res.status(500).json({
//       message: "Failed to fetch summary",
//     });
//   }
// }; 

const Razorpay = require("razorpay");
const crypto = require("crypto");
const db = require("../config/db");

// ================================
// SAFE RAZORPAY INIT
// ================================
const getRazorpay = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    console.error("❌ Razorpay ENV missing");
    throw new Error("Razorpay environment variables missing");
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
};

// ================================
// CREATE ORDER
// ================================
console.log("🔥 ENV CHECK:");
console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    let { plan } = req.body;

    if (!plan) plan = "MONTHLY";

    const amount = plan === "YEARLY" ? 299900 : 29900;

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

    return res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      user: {
        name: user.name || "",
        email: user.email || "",
        contact: "",
      },
    });
  } catch (error) {
    console.error("❌ CREATE ORDER ERROR:", error);
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

    // update user subscription
    await db.promise().query(
      `
      UPDATE users
      SET subscription_type='PREMIUM',
          subscription_expiry=?
      WHERE id=?
      `,
      [expiryDate, userId]
    );

    // save payment
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
        payment.currency || "INR",
        payment.method || "",
        payment.email || "",
        payment.contact || "",
        payment.status || "SUCCESS",
        JSON.stringify(payment),
      ]
    );

    return res.json({
      success: true,
      message: "Premium Activated Successfully",
      expiry: expiryDate,
    });
  } catch (error) {
    console.error("❌ VERIFY PAYMENT ERROR:", error);
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
      `
      SELECT subscription_type, subscription_expiry
      FROM users
      WHERE id=?
      `,
      [userId]
    );

    return res.json(
      result[0] || {
        subscription_type: "FREE",
        subscription_expiry: null,
      }
    );
  } catch (error) {
    console.error(error);
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
      `
      SELECT * FROM payments
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return res.json(payments);
  } catch (err) {
    console.error(err);
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
    console.error(err);
    return res.status(500).json({
      message: "Failed to fetch summary",
    });
  }
};