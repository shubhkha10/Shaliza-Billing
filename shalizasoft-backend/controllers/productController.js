const db = require("../config/db");

// GET ALL PRODUCTS
exports.getProducts = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT *
    FROM products
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

// ADD PRODUCT
exports.addProduct = (req, res) => {
  const userId = req.user.id;

  const {
    product_name,
    price,
    stock_quantity,
  } = req.body;

  const sql = `
    INSERT INTO products
    (
      product_name,
      price,
      stock_quantity,
      user_id
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      product_name,
      price,
      stock_quantity,
      userId,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      // INVENTORY HISTORY ENTRY
      const historySql = `
        INSERT INTO inventory_history
        (
          product_name,
          quantity,
          action_type,
          reference_no,
          user_id
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        historySql,
        [
          product_name,
          stock_quantity,
          "IN",
          "PRODUCT_CREATED",
          userId,
        ],
        (historyErr) => {
          if (historyErr) {
            console.log(historyErr);
          }

          res.json({
            message:
              "Product Added Successfully",
          });
        }
      );
    }
  );
};

// UPDATE PRODUCT
exports.updateProduct = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const {
    product_name,
    price,
    stock_quantity,
  } = req.body;

  // GET OLD STOCK FIRST
  const findSql = `
    SELECT *
    FROM products
    WHERE id = ?
    AND user_id = ?
  `;

  db.query(
    findSql,
    [id, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Product Not Found",
        });
      }

      const oldStock =
        Number(result[0].stock_quantity);

      const newStock =
        Number(stock_quantity);

      const difference =
        newStock - oldStock;

      const updateSql = `
        UPDATE products
        SET
          product_name=?,
          price=?,
          stock_quantity=?
        WHERE id=?
        AND user_id=?
      `;

      db.query(
        updateSql,
        [
          product_name,
          price,
          stock_quantity,
          id,
          userId,
        ],
        (err) => {
          if (err) {
            return res.status(500).json(err);
          }

          // SAVE INVENTORY HISTORY
          if (difference !== 0) {
            const actionType =
              difference > 0
                ? "IN"
                : "OUT";

            const historySql = `
              INSERT INTO inventory_history
              (
                product_name,
                quantity,
                action_type,
                reference_no,
                user_id
              )
              VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
              historySql,
              [
                product_name,
                Math.abs(difference),
                actionType,
                "STOCK_UPDATE",
                userId,
              ]
            );
          }

          res.json({
            message:
              "Product Updated Successfully",
          });
        }
      );
    }
  );
};

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const sql = `
    DELETE FROM products
    WHERE id=?
    AND user_id=?
  `;

  db.query(
    sql,
    [id, userId],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message:
          "Product Deleted Successfully",
      });
    }
  );
};