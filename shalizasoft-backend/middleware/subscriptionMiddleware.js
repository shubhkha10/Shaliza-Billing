// const db = require("../config/db");

// const subscriptionMiddleware = (
//   req,
//   res,
//   next
// ) => {
//   const userId = req.user.id;

//   db.query(
//     `
//     SELECT
//       subscription_type,
//       subscription_expiry
//     FROM users
//     WHERE id = ?
//     `,
//     [userId],
//     (err, result) => {

//       if (err) {
//         return res.status(500).json(err);
//       }

//       if (!result.length) {
//         return res.status(404).json({
//           message: "User not found",
//         });
//       }

//       const user = result[0];

//       if (
//         user.subscription_type ===
//         "LIFETIME"
//       ) {
//         return next();
//       }

//       if (
//         user.subscription_type ===
//         "PREMIUM"
//       ) {
//         return next();
//       }

//       return res.status(403).json({
//         message:
//           "Premium Plan Required",
//       });
//     }
//   );
// };

// module.exports =
//   subscriptionMiddleware;  


const db = require("../config/db");

const subscriptionMiddleware = (req, res, next) => {
  try {
    // ✅ SAFETY CHECK (IMPORTANT FIX)
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized - User not found in request",
      });
    }

    const userId = req.user.id;

    db.query(
      `
      SELECT subscription_type, subscription_expiry
      FROM users
      WHERE id = ?
      `,
      [userId],
      (err, result) => {
        if (err) {
          console.log("SUBSCRIPTION DB ERROR:", err);
          return res.status(500).json({
            message: "Database error",
          });
        }

        if (!result.length) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        const user = result[0];

        if (
          user.subscription_type === "LIFETIME" ||
          user.subscription_type === "PREMIUM"
        ) {
          return next();
        }

        return res.status(403).json({
          message: "Premium Plan Required",
        });
      }
    );
  } catch (error) {
    console.log("SUBSCRIPTION MIDDLEWARE ERROR:", error);

    return res.status(500).json({
      message: "Server error in subscription middleware",
    });
  }
};

module.exports = subscriptionMiddleware;