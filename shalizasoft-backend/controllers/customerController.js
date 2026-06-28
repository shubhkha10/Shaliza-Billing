const db = require("../config/db");

// GET CUSTOMERS (USER SPECIFIC)
exports.getCustomers = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT * 
    FROM customers 
    WHERE user_id = ? 
    ORDER BY id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

// ADD CUSTOMER (NAME REQUIRED, OTHERS OPTIONAL)
exports.addCustomer = (req, res) => {
  const userId = req.user.id;

  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Customer name is required",
    });
  }

  const sql = `
    INSERT INTO customers (name, email, phone, user_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email || null, phone || null, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Customer Added Successfully",
      });
    }
  );
};

// DELETE CUSTOMER (USER SAFE)
exports.deleteCustomer = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const sql = `
    DELETE FROM customers 
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [id, userId], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Customer Deleted Successfully",
    });
  });
};