const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const subscriptionMiddleware = require("../middleware/subscriptionMiddleware");
const { checkInvoiceLimit } = require("../middleware/usageLimitMiddleware");

const {
  getInvoices,
  addInvoice,
  deleteInvoice,
  updatePaymentStatus,
  sendInvoice,
  generateInvoicePDF,
} = require("../controllers/invoiceController");

// ==========================
// INVOICES
// ==========================
router.get("/", authMiddleware, getInvoices);

router.post("/", authMiddleware, checkInvoiceLimit, addInvoice);

router.delete("/:id", authMiddleware, deleteInvoice);

// ==========================
// STATUS UPDATE
// ==========================
router.put("/:id/status", authMiddleware, updatePaymentStatus);

// ==========================
// SEND (WHATSAPP TRIGGER)
// ==========================
router.post("/:id/send", authMiddleware, sendInvoice);

// ==========================
// PDF DOWNLOAD
// ==========================
router.get("/:id/download", authMiddleware, generateInvoicePDF);

// ==========================
// PREMIUM TEST
// ==========================
router.get(
  "/premium-test",
  authMiddleware,
  subscriptionMiddleware,
  (req, res) => {
    res.json({ message: "Premium Access Granted" });
  }
);

module.exports = router;