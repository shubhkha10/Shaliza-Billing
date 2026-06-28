const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

console.log("SERVER FILE LOADED");

const app = express();
const PORT = process.env.PORT || 5001;
const path = require("path");


// ROUTES
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const reportRoutes = require("./routes/reportRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const billingRoutes =
  require("./routes/billingRoutes");
  const subscriptionRoutes =
  require("./routes/subscriptionRoutes");
  const contactRoutes = require("./routes/contactRoutes");




// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(
"/uploads",
express.static("uploads")
);


// REQUEST LOGGER
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("ShalizaSoft Backend Running");
});

app.get("/hello", (req, res) => {
  res.send("Hello Backend");
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/billing", billingRoutes);
app.use(
  "/api/subscription",
  subscriptionRoutes
);
app.use("/api/contact", contactRoutes);
// START SERVER
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});