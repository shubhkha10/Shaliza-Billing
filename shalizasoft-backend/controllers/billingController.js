const db = require("../config/db");

exports.getBillingDashboard = async (req, res) => {
  const userId = req.user.id;

  try {
    const [customers] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS totalCustomers FROM customers WHERE user_id = ?",
        [userId]
      );

    const [products] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS totalProducts FROM products WHERE user_id = ?",
        [userId]
      );

    const [invoices] = await db
      .promise()
      .query(
        "SELECT COUNT(*) AS totalInvoices FROM invoices WHERE user_id = ?",
        [userId]
      );

    const [revenue] = await db
      .promise()
      .query(
        "SELECT SUM(total) AS totalRevenue FROM invoices WHERE user_id = ?",
        [userId]
      );

    const [recentInvoices] = await db
      .promise()
      .query(
        `SELECT * FROM invoices
         WHERE user_id = ?
         ORDER BY id DESC
         LIMIT 5`,
        [userId]
      );

    const [lowStock] = await db
      .promise()
      .query(
        `SELECT * FROM products
         WHERE user_id = ?
         AND stock_quantity <= 5`,
        [userId]
      );

    res.json({
      totalCustomers: customers[0].totalCustomers,
      totalProducts: products[0].totalProducts,
      totalInvoices: invoices[0].totalInvoices,
      totalRevenue: revenue[0].totalRevenue || 0,
      recentInvoices,
      lowStock,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};