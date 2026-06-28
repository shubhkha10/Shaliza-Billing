const db = require("../config/db");

// ==========================
// DASHBOARD REPORT
// ==========================
exports.getDashboardReport = (req, res) => {
  const userId = req.user.id;

  const report = {};

  // TOTAL CUSTOMERS
  db.query(
    "SELECT COUNT(*) AS totalCustomers FROM customers WHERE user_id=?",
    [userId],
    (err, customerResult) => {
      if (err) return res.status(500).json(err);

      report.totalCustomers = customerResult[0].totalCustomers;

      // TOTAL PRODUCTS
      db.query(
        "SELECT COUNT(*) AS totalProducts FROM products WHERE user_id=?",
        [userId],
        (err, productResult) => {
          if (err) return res.status(500).json(err);

          report.totalProducts = productResult[0].totalProducts;

          // TOTAL INVOICES
          db.query(
            "SELECT COUNT(*) AS totalInvoices FROM invoices WHERE user_id=?",
            [userId],
            (err, invoiceResult) => {
              if (err) return res.status(500).json(err);

              report.totalInvoices =
                invoiceResult[0].totalInvoices;

              // TOTAL REVENUE
              db.query(
                `SELECT IFNULL(SUM(total),0) AS totalRevenue
                 FROM invoices
                 WHERE user_id=?`,
                [userId],
                (err, revenueResult) => {
                  if (err)
                    return res.status(500).json(err);

                  report.totalRevenue =
                    revenueResult[0].totalRevenue;

                  // LOW STOCK
                  db.query(
                    `SELECT COUNT(*) AS lowStockCount
                     FROM products
                     WHERE user_id=?
                     AND stock_quantity<=5`,
                    [userId],
                    (err, stockResult) => {
                      if (err)
                        return res.status(500).json(err);

                      report.lowStockCount =
                        stockResult[0].lowStockCount;

                      // RECENT INVOICES
                      db.query(
                        `SELECT *
                         FROM invoices
                         WHERE user_id=?
                         ORDER BY id DESC
                         LIMIT 5`,
                        [userId],
                        (err, recentResult) => {
                          if (err)
                            return res.status(500).json(err);

                          report.recentInvoices =
                            recentResult;

                          // MONTHLY REVENUE
                          db.query(
                            `
                            SELECT
                              DATE_FORMAT(created_at,'%b') AS month,
                              SUM(total) AS revenue
                            FROM invoices
                            WHERE user_id=?
                            GROUP BY
                              MONTH(created_at),
                              DATE_FORMAT(created_at,'%b')
                            ORDER BY
                              MONTH(created_at)
                            `,
                            [userId],
                            (err, monthlyResult) => {
                              if (err)
                                return res.status(500).json(err);

                              report.monthlyRevenue =
                                monthlyResult;

                              // TOP PRODUCTS
                              db.query(
`
SELECT
    product_name,
    SUM(quantity) AS totalSold
FROM invoice_items
WHERE user_id = ?
GROUP BY product_name
HAVING SUM(quantity) > 0
ORDER BY totalSold DESC
LIMIT 5
`,
[userId],
(err, productSales) => {

    if (err) {
        return res.status(500).json(err);
    }

    report.topProducts = productSales;

    res.json(report);
});
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};