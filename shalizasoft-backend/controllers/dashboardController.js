const db = require("../config/db");

exports.getStats = (req, res) => {
  const userId = req.user.id;

  const stats = {};

  db.query(
    "SELECT COUNT(*) AS totalCustomers FROM customers WHERE user_id = ?",
    [userId],
    (err, customerResult) => {
      if (err) return res.status(500).json(err);

      stats.totalCustomers = customerResult[0].totalCustomers;

      db.query(
        "SELECT COUNT(*) AS totalProducts FROM products WHERE user_id = ?",
        [userId],
        (err, productResult) => {
          if (err) return res.status(500).json(err);

          stats.totalProducts = productResult[0].totalProducts;

          db.query(
            "SELECT COUNT(*) AS totalInvoices FROM invoices WHERE user_id = ?",
            [userId],
            (err, invoiceResult) => {
              if (err) return res.status(500).json(err);

              stats.totalInvoices = invoiceResult[0].totalInvoices;

              db.query(
                "SELECT IFNULL(SUM(total),0) AS totalRevenue FROM invoices WHERE user_id = ?",
                [userId],
                (err, revenueResult) => {
                  if (err) return res.status(500).json(err);

                  stats.totalRevenue = revenueResult[0].totalRevenue;

                  res.json(stats);
                }
              );
            }
          );
        }
      );
    }
  );
};