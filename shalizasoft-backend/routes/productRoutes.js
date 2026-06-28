const express = require("express");
const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  checkProductLimit,
} = require("../middleware/usageLimitMiddleware");

router.get(
  "/",
  authMiddleware,
  getProducts
);

router.post(
  "/",
  authMiddleware,
  checkProductLimit,
  addProduct
);

router.put(
  "/:id",
  authMiddleware,
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);

module.exports = router;