/**
 * Payment Routes
 */
const express = require("express");
const router = express.Router();
const { paymentController } = require("../controllers");
const { authenticate, validateObjectId } = require("../middlewares");

// Public token-based Razorpay endpoints
router.get(
  "/razorpay/checkout/:token",
  paymentController.renderRazorpayCheckout
);
router.post("/razorpay/verify", paymentController.verifyRazorpayPayment);

// All remaining routes require authentication
router.use(authenticate);

// User routes
router.get("/", paymentController.getPayments);
router.get("/:id", validateObjectId("id"), paymentController.getPayment);
router.post(
  "/:id/razorpay/order",
  validateObjectId("id"),
  paymentController.createRazorpayOrderForPayment
);
router.get(
  "/:id/receipt",
  validateObjectId("id"),
  paymentController.downloadReceipt
);
router.get(
  "/jobcard/:jobCardId",
  validateObjectId("jobCardId"),
  paymentController.getJobCardPayments
);

module.exports = router;
