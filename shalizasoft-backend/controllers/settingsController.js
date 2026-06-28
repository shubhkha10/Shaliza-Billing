const db = require("../config/db");

// GET SETTINGS
exports.getSettings = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM company_settings WHERE user_id = ? LIMIT 1",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result[0] || {});
    }
  );
};

// SAVE SETTINGS (CLEAN STRUCTURE)
exports.saveSettings = (req, res) => {
  const userId = req.user.id;

  const {
    company_name,
    owner_name,
    logo_url,
    address,
    website,
    phone,
    email,
    currency,
    tax_percentage,
    invoice_note,
    upi_id,
    bank_name,
    account_number,
    ifsc_code,
  } = req.body;

  db.query(
    "SELECT id FROM company_settings WHERE user_id = ?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const data = [
        userId,
        company_name,
        owner_name,
        logo_url,
        address,
        website,
        phone,
        email,
        currency,
        tax_percentage,
        invoice_note,
        upi_id,
        bank_name,
        account_number,
        ifsc_code,
      ];

      if (result.length === 0) {
        const insertSql = `
          INSERT INTO company_settings
          (
            user_id,
            company_name,
            owner_name,
            logo_url,
            address,
            website,
            phone,
            email,
            currency,
            tax_percentage,
            invoice_note,
            upi_id,
            bank_name,
            account_number,
            ifsc_code
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(insertSql, data, (err) => {
          if (err) return res.status(500).json(err);

          res.json({ message: "Settings Created Successfully" });
        });
      } else {
        const updateSql = `
          UPDATE company_settings SET
            company_name=?,
            owner_name=?,
            logo_url=?,
            address=?,
            website=?,
            phone=?,
            email=?,
            currency=?,
            tax_percentage=?,
            invoice_note=?,
            upi_id=?,
            bank_name=?,
            account_number=?,
            ifsc_code=?
          WHERE user_id=?
        `;

        db.query(
          updateSql,
          [
            company_name,
            owner_name,
            logo_url,
            address,
            website,
            phone,
            email,
            currency,
            tax_percentage,
            invoice_note,
            upi_id,
            bank_name,
            account_number,
            ifsc_code,
            userId,
          ],
          (err) => {
            if (err) return res.status(500).json(err);

            res.json({ message: "Settings Updated Successfully" });
          }
        );
      }
    }
  );
};