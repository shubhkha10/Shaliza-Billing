const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const db = require("./config/db");

console.log("🚀 SERVER FILE LOADED");

const app = express();
const PORT = process.env.PORT || 5001;

// =========================
// MIDDLEWARE
// =========================

// Allow frontend access (production safe)
app.use(
  cors({
    origin: "*", // later you can replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// FIXED static path (production safe)
app.use("/uploads", express.static(path.resolve("uploads")));

// REQUEST LOGGER
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// =========================
// DB CHECK (IMPORTANT)
// =========================
db.query("SELECT 1", (err) => {
  if (err) {
    console.log("❌ DB Connection Failed:", err.message);
  } else {
    console.log("✅ DB Connected Successfully");
  }
});

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.send("ShalizaSoft Backend Running 🚀");
});

app.get("/hello", (req, res) => {
  res.send("Hello Backend");
});

// =========================
// ROUTES
// =========================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/pdf", require("./routes/pdfRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/billing", require("./routes/billingRoutes"));
app.use("/api/subscription", require("./routes/subscriptionRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// =========================
// ERROR HANDLER (IMPORTANT)
// =========================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`✅ Server Running On Port ${PORT}`);
});