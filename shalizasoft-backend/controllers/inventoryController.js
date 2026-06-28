const db = require("../config/db");

exports.getInventoryHistory = (req, res) => {
  const userId = req.user.id;

  const historySql = `
    SELECT *
    FROM inventory_history
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  const productsSql = `
    SELECT *
    FROM products
    WHERE user_id = ?
  `;

  db.query(
    historySql,
    [userId],
    (err, history) => {
      if (err)
        return res.status(500).json(err);

      db.query(
        productsSql,
        [userId],
        (err, products) => {
          if (err)
            return res
              .status(500)
              .json(err);

          res.json({
            history,
            products,
          });
        }
      );
    }
  );
};