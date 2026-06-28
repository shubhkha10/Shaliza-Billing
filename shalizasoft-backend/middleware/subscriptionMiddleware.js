const db = require("../config/db");

const subscriptionMiddleware = (
  req,
  res,
  next
) => {
  const userId = req.user.id;

  db.query(
    `
    SELECT
      subscription_type,
      subscription_expiry
    FROM users
    WHERE id = ?
    `,
    [userId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (!result.length) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      if (
        user.subscription_type ===
        "LIFETIME"
      ) {
        return next();
      }

      if (
        user.subscription_type ===
        "PREMIUM"
      ) {
        return next();
      }

      return res.status(403).json({
        message:
          "Premium Plan Required",
      });
    }
  );
};

module.exports =
  subscriptionMiddleware;  