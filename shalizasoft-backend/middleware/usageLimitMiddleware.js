const db = require("../config/db");

const sendLimitResponse = (res, limitType) => {
  return res.status(403).json({
    code: "PLAN_LIMIT",
    title: "Free Plan Limit Reached",
    limitType,
    message:
      "You have reached your free plan limit. Upgrade to Premium to continue.",
    upgradeUrl: "/subscription",
  });
};

exports.checkCustomerLimit = (req, res, next) => {
  const userId = req.user.id;

  db.query(
    "SELECT subscription_type FROM users WHERE id=?",
    [userId],
    (err, userResult) => {
      if (err) return res.status(500).json(err);

      const plan =
        userResult[0]?.subscription_type || "FREE";

      if (
        plan === "PREMIUM" ||
        plan === "LIFETIME"
      ) {
        return next();
      }

      db.query(
        "SELECT COUNT(*) AS total FROM customers WHERE user_id=?",
        [userId],
        (err, countResult) => {
          if (err) return res.status(500).json(err);

          if (countResult[0].total >= 5) {
            return sendLimitResponse(
              res,
              "CUSTOMERS"
            );
          }

          next();
        }
      );
    }
  );
};

exports.checkProductLimit = (req, res, next) => {
  const userId = req.user.id;

  db.query(
    "SELECT subscription_type FROM users WHERE id=?",
    [userId],
    (err, userResult) => {
      if (err) return res.status(500).json(err);

      const plan =
        userResult[0]?.subscription_type || "FREE";

      if (
        plan === "PREMIUM" ||
        plan === "LIFETIME"
      ) {
        return next();
      }

      db.query(
        "SELECT COUNT(*) AS total FROM products WHERE user_id=?",
        [userId],
        (err, countResult) => {
          if (err) return res.status(500).json(err);

          if (countResult[0].total >= 10) {
            return sendLimitResponse(
              res,
              "PRODUCTS"
            );
          }

          next();
        }
      );
    }
  );
};

exports.checkInvoiceLimit = (req, res, next) => {
  const userId = req.user.id;

  db.query(
    "SELECT subscription_type FROM users WHERE id=?",
    [userId],
    (err, userResult) => {
      if (err) return res.status(500).json(err);

      const plan =
        userResult[0]?.subscription_type || "FREE";

      if (
        plan === "PREMIUM" ||
        plan === "LIFETIME"
      ) {
        return next();
      }

      db.query(
        "SELECT COUNT(*) AS total FROM invoices WHERE user_id=?",
        [userId],
        (err, countResult) => {
          if (err) return res.status(500).json(err);

          if (countResult[0].total >= 10) {
            return sendLimitResponse(
              res,
              "INVOICES"
            );
          }

          next();
        }
      );
    }
  );
};