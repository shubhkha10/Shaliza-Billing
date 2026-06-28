const db = require("../config/db");
const PDFDocument = require("pdfkit");

// ==========================
// GET INVOICES
// ==========================
exports.getInvoices = (req, res) => {
  const userId = req.user.id;

  db.query(
    `SELECT * FROM invoices WHERE user_id = ? ORDER BY id DESC`,
    [userId],
    (err, result) => {
      if (err) {
        console.log("GET INVOICE ERROR:", err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
};

// ==========================
// CREATE INVOICE
// ==========================
exports.addInvoice = (req, res) => {
  const userId = req.user.id;

  const {
    customer_name,
    customer_email,
    customer_phone,
    items,
    gst = 18,
    discount = 0,
  } = req.body;

  if (!customer_name) {
    return res.status(400).json({ message: "Customer required" });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Items required" });
  }

  let subtotal = 0;
  const invoiceNumber = "INV-" + Date.now();

  const validateItems = (index, callback) => {
    if (index >= items.length) return callback();

    const item = items[index];

    db.query(
      `SELECT * FROM products WHERE product_name = ? AND user_id = ?`,
      [item.product_name, userId],
      (err, result) => {
        if (err) return callback(err);

        if (!result.length) {
          return callback(new Error("Product not found: " + item.product_name));
        }

        const product = result[0];

        if (item.quantity > product.stock_quantity) {
          return callback(new Error("Not enough stock for " + item.product_name));
        }

        subtotal += item.quantity * item.price;

        validateItems(index + 1, callback);
      }
    );
  };

  validateItems(0, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const gstAmount = (subtotal * gst) / 100;
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal + gstAmount - discountAmount;

    const companySql = `SELECT * FROM company_settings WHERE user_id = ? LIMIT 1`;

    db.query(companySql, [userId], (err2, companyRes) => {
      const company = companyRes[0] || {};

      const insertSql = `
        INSERT INTO invoices (
          customer_name,
          customer_email,
          customer_phone,
          invoice_number,
          subtotal,
          gst_percentage,
          gst_amount,
          discount,
          total,
          payment_status,
          user_id,
          company_name,
          company_address,
          company_phone,
          company_gst
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [
          customer_name,
          customer_email || "",
          customer_phone || "",
          invoiceNumber,
          subtotal,
          gst,
          gstAmount,
          discountAmount,
          total,
          "UNPAID",
          userId,
          company.company_name || "",
          company.address || "",
          company.phone || "",
          company.gst_number || "",
        ],
        (err3, result2) => {
          const invoiceId = result2.insertId;

          const values = items.map((item) => [
            invoiceId,
            item.product_name,
            item.quantity,
            item.price,
            item.quantity * item.price,
            userId,
          ]);
          db.query(
  `INSERT INTO invoice_items (invoice_id, product_name, quantity, price, total, user_id) VALUES ?`,
  [values],
  (err4) => {
    if (err4) {
      return res.status(500).json(err4);
    }

    let completed = 0;

    items.forEach((item) => {
      // Reduce Stock
      db.query(
        `
        UPDATE products
        SET stock_quantity = stock_quantity - ?
        WHERE product_name = ?
        AND user_id = ?
        `,
        [
          item.quantity,
          item.product_name,
          userId,
        ],
        (err5) => {
          if (err5) console.log(err5);

          // Add Inventory History
          db.query(
            `
            INSERT INTO inventory_history
            (
              product_name,
              quantity,
              action_type,
              reference_no,
              user_id
            )
            VALUES (?, ?, 'OUT', ?, ?)
            `,
            [
              item.product_name,
              item.quantity,
              invoiceNumber,
              userId,
            ],
            (err6) => {
              if (err6) console.log(err6);

              completed++;

              if (completed === items.length) {
                res.json({
                  message:
                    "Invoice Created Successfully",
                  invoiceNumber,
                  total,
                });
              }
            }
          );
        }
      );
    });
  }
);
          
        }
      );
    });
  });
};

// ==========================
// DELETE INVOICE
// ==========================
exports.deleteInvoice = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query(
    `DELETE FROM invoices WHERE id = ? AND user_id = ?`,
    [id, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Invoice Deleted" });
    }
  );
};

// ==========================
// UPDATE STATUS
// ==========================
exports.updatePaymentStatus = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    `UPDATE invoices SET payment_status = ? WHERE id = ? AND user_id = ?`,
    [status, id, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Status Updated" });
    }
  );
};

// ==========================
// SEND (WHATSAPP LOGIC TRIGGER)
// ==========================
exports.sendInvoice = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query(
    `SELECT * FROM invoices WHERE id = ? AND user_id = ?`,
    [id, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (!result.length) {
        return res.status(404).json({ message: "Invoice Not Found" });
      }

      const invoice = result[0];

      // This is backend simulation (frontend opens WhatsApp)
      console.log("Send invoice to:", invoice.customer_phone);

      res.json({
        message: "Invoice send trigger ready",
        phone: invoice.customer_phone,
      });
    }
  );
};

// ==========================
// PDF GENERATE
// ==========================
exports.generateInvoicePDF = (req, res) => {
  const userId = req.user.id;
  const invoiceId = req.params.id;

  db.query(
    `SELECT * FROM invoices WHERE id = ? AND user_id = ?`,
    [invoiceId, userId],
    (err, invoiceRes) => {
      if (err) return res.status(500).json(err);

      const invoice = invoiceRes[0];

      db.query(
        `SELECT * FROM invoice_items WHERE invoice_id = ?`,
        [invoiceId],
        (err2, itemsRes) => {
          if (err2) return res.status(500).json(err2);

          const doc = new PDFDocument({ size: "A4", margin: 40 });

          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename=${invoice.invoice_number}.pdf`
          );

          doc.pipe(res);

          doc.fontSize(20).text("INVOICE", { align: "center" });

          doc.moveDown();

          doc.fontSize(12).text(`Invoice No: ${invoice.invoice_number}`);
          doc.text(`Customer: ${invoice.customer_name}`);
          doc.text(`Email: ${invoice.customer_email}`);
          doc.text(`Phone: ${invoice.customer_phone}`);

          doc.moveDown();

          itemsRes.forEach((item) => {
            doc.text(
              `${item.product_name} | Qty: ${item.quantity} | ₹${item.total}`
            );
          });

          doc.moveDown();

          doc.fontSize(14).text(`TOTAL: ₹${invoice.total}`);

          doc.end();
        }
      );
    }
  );
};