const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { generateInvoicePDF } = require("../controllers/pdfController");

router.get("/invoice/:id", authMiddleware, generateInvoicePDF);

module.exports = router;