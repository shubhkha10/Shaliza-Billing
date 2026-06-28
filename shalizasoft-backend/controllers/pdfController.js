const PDFDocument = require("pdfkit");
const db = require("../config/db");

exports.generateInvoicePDF = (req, res) => {
  const userId = req.user.id;
  const invoiceId = req.params.id;

  db.query(
    "SELECT * FROM invoices WHERE id=? AND user_id=?",
    [invoiceId, userId],
    (err, invRes) => {
      if (err) return res.status(500).json(err);
      if (!invRes.length) return res.status(404).json({ message: "Not found" });

      const invoice = invRes[0];

      db.query(
        "SELECT * FROM invoice_items WHERE invoice_id=?",
        [invoiceId],
        (err2, items) => {
          if (err2) return res.status(500).json(err2);

          db.query(
            "SELECT * FROM company_settings WHERE user_id=? LIMIT 1",
            [userId],
            (err3, setRes) => {
              if (err3) return res.status(500).json(err3);

              const s = setRes[0] || {};
              const doc = new PDFDocument({ size: "A4", margin: 50 });

              res.setHeader("Content-Type", "application/pdf");
              res.setHeader(
                "Content-Disposition",
                `attachment; filename=${invoice.invoice_number}.pdf`
              );

              doc.pipe(res);

              // SAFE CURRENCY SYMBOL
              const currency = "Rs ";

              // ================= STRIPE DARK HEADER =================
              doc.rect(0, 0, 595, 95).fill("#111827");

              doc.fillColor("white").fontSize(20)
                .text(s.company_name || "Company Name", 50, 30);

              doc.fontSize(10)
                .text(s.address || "", 50, 55)
                .text(`${s.email || ""} | ${s.phone || ""}`);

              doc.fontSize(16)
                .text("INVOICE", 420, 35);

              doc.fontSize(10)
                .text(`#${invoice.invoice_number}`, 420, 60);

              // ================= CUSTOMER CARD =================
              let y = 120;

              doc.rect(50, y, 495, 70).stroke("#e5e7eb");

              doc.fillColor("#111").fontSize(11)
                .text("Billed To", 60, y + 10);

              doc.fontSize(13)
                .text(invoice.customer_name, 60, y + 30);

              doc.fontSize(10)
                .fillColor("gray")
                .text(
                  `Date: ${new Date(invoice.created_at).toDateString()}`,
                  380,
                  y + 25
                );

              y += 100;

              // ================= TABLE HEADER =================
              doc.rect(50, y, 495, 30).fill("#2563eb");

              doc.fillColor("white").fontSize(10);
              doc.text("Product", 60, y + 10);
              doc.text("Qty", 290, y + 10);
              doc.text("Price", 370, y + 10);
              doc.text("Total", 460, y + 10);

              y += 40;

              // ================= ITEMS =================
              let subtotal = 0;

              items.forEach((item, i) => {
                const total = item.quantity * item.price;
                subtotal += total;

                if (i % 2 === 0) {
                  doc.rect(50, y - 5, 495, 20).fill("#f8fafc");
                }

                doc.fillColor("#111");

                doc.text(item.product_name, 60, y);
                doc.text(item.quantity, 290, y);

                // SAFE FORMAT (NO ₹ SYMBOL)
                doc.text(`${currency}${item.price}`, 370, y);
                doc.text(`${currency}${total}`, 460, y);

                y += 25;
              });

              // ================= TOTAL =================
              const tax = (subtotal * (s.tax_percentage || 0)) / 100;
              const grandTotal = subtotal + tax;

              y += 25;

              const boxY = y;

              doc.rect(320, boxY, 225, 120).stroke("#e5e7eb");

              doc.fillColor("#111").fontSize(10);

              doc.text("Subtotal", 335, boxY + 15);
              doc.text(`${currency}${subtotal.toFixed(2)}`, 480, boxY + 15);

              doc.text("Tax", 335, boxY + 40);
              doc.text(`${currency}${tax.toFixed(2)}`, 480, boxY + 40);

              doc.text("-----------------------", 335, boxY + 60);

              doc.fontSize(12)
                .fillColor("#16a34a")
                .text("TOTAL", 335, boxY + 85);

              doc.text(`${currency}${grandTotal.toFixed(2)}`, 470, boxY + 85);

              // ================= FOOTER =================
              doc
                .fontSize(10)
                .fillColor("#6b7280")
                .text(
                  s.invoice_note || "Thank you for your business",
                  50,
                  780,
                  { align: "center" }
                );

              doc.end();
            }
          );
        }
      );
    }
  );
};