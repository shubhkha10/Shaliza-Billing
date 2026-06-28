const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  sendContactMessage,
} = require("../controllers/contactController");

// optional auth (allow both logged in & guest)
router.post("/", authMiddleware, sendContactMessage);

module.exports = router;