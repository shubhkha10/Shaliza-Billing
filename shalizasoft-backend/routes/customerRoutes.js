const express = require("express");
const router = express.Router();

const {
  getCustomers,
  addCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  checkCustomerLimit,
} = require("../middleware/usageLimitMiddleware");

router.get(
  "/",
  authMiddleware,
  getCustomers
);

router.post(
  "/",
  authMiddleware,
  checkCustomerLimit,
  addCustomer
);

router.delete(
  "/:id",
  authMiddleware,
  deleteCustomer
);

module.exports = router;