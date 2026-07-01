const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createOrder,
  verifyPayment,
  getSubscription,
  getPaymentHistory,
  getPaymentSummary,
} = require("../controllers/subscriptionController");

// =====================
// SUBSCRIPTION ROUTES
// =====================

router.post("/create-order", authMiddleware, createOrder);

router.post("/verify-payment", authMiddleware, verifyPayment);

router.get("/current", authMiddleware, getSubscription);

router.get("/payments", authMiddleware, getPaymentHistory);

router.get("/summary", authMiddleware, getPaymentSummary);

module.exports = router;