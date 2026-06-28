const express = require("express");
const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getInventoryHistory,
} = require("../controllers/inventoryController");

router.get(
  "/",
  authMiddleware,
  getInventoryHistory
);

module.exports = router;