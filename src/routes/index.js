/**
 * Routes Index
 * Central route registration
 */
const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const vehicleRoutes = require("./vehicle.routes");
const serviceRoutes = require("./service.routes");
const appointmentRoutes = require("./appointment.routes");
const jobcardRoutes = require("./jobcard.routes");
const paymentRoutes = require("./payment.routes");
const reviewRoutes = require("./review.routes");
const uploadRoutes = require("./upload.routes");
const adminRoutes = require("./admin.routes");
const superadminRoutes = require("./superadmin.routes");
const mechanicRoutes = require("./mechanic.routes");
const inventoryRoutes = require("./inventory.routes");

// Health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "ClutchGear API is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/services", serviceRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/jobcards", jobcardRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/upload", uploadRoutes);
router.use("/admin", adminRoutes);
router.use("/admin/inventory", inventoryRoutes);
router.use("/superadmin", superadminRoutes);
router.use("/mechanic", mechanicRoutes);

module.exports = router;
