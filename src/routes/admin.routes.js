/**
 * Admin Routes
 * All admin-only endpoints
 */
const express = require("express");
const multer = require("multer");
const config = require("../config");
const router = express.Router();
const {
  adminController,
  appointmentController,
  jobcardController,
  paymentController,
  reviewController,
  enquiryController,
} = require("../controllers");
const {
  authenticate,
  isAdmin,
  validate,
  validateObjectId,
} = require("../middlewares");
const {
  updateAppointmentValidation,
  updateUserRoleValidation,
  createJobCardValidation,
  updateJobCardValidation,
  addJobItemValidation,
  updateBillingValidation,
  assignMechanicsValidation,
  createPaymentValidation,
  updatePaymentValidation,
  refundPaymentValidation,
  adminResponseValidation,
  createWalkInCustomerValidation,
  createEnquiryValidation,
  updateEnquiryValidation,
  addFollowUpValidation,
  assignEnquiryValidation,
  convertEnquiryValidation,
} = require("../validators");

// Image upload config
const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.upload.maxImageSize },
  fileFilter: (req, file, cb) => {
    if (config.upload.allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Video upload config
const videoUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.upload.maxVideoSize },
  fileFilter: (req, file, cb) => {
    if (config.upload.allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"), false);
    }
  },
});

// Mixed media upload config (images + videos)
const mediaUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.upload.maxVideoSize },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      ...config.upload.allowedImageTypes,
      ...config.upload.allowedVideoTypes,
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed"), false);
    }
  },
});

// All routes require admin authentication
router.use(authenticate, isAdmin);

// Dashboard
router.get("/dashboard", adminController.getDashboard);

// Analytics
router.get("/analytics/revenue", adminController.getRevenueAnalytics);
router.get("/analytics/services", adminController.getServiceAnalytics);

// User Management
router.get("/users", adminController.getAllUsers);
router.get(
  "/users/:id",
  validateObjectId("id"),
  adminController.getUserDetails
);
router.put(
  "/users/:id/status",
  validateObjectId("id"),
  adminController.updateUserStatus
);

// Customer Management (Walk-in)
router.get("/customers", adminController.getAllCustomers);
router.post(
  "/customers/walk-in",
  createWalkInCustomerValidation,
  validate,
  adminController.createWalkInCustomer
);
router.get(
  "/customers/:id/vehicles",
  validateObjectId("id"),
  adminController.getCustomerVehicles
);
router.post(
  "/customers/:id/vehicles",
  validateObjectId("id"),
  adminController.addCustomerVehicle
);
router.get(
  "/customers/:id/history",
  validateObjectId("id"),
  adminController.getCustomerServiceHistory
);

// Mechanic role management (admin-controlled)
router.get("/mechanics", adminController.listMechanics);
router.get("/mechanics/workload", adminController.getAllMechanicsWorkload);
router.get("/mechanics/workload/all", adminController.getAllMechanicsWorkload);
router.get(
  "/mechanics/:id/workload",
  validateObjectId("id"),
  adminController.getMechanicWorkload
);
router.put(
  "/users/:id/role",
  validateObjectId("id"),
  updateUserRoleValidation,
  validate,
  adminController.updateUserRole
);
// Admin creation/promotions are restricted to Super Admin via /superadmin endpoints

// Time Slots
router.get("/timeslots", adminController.getTimeSlots);
router.post("/timeslots", adminController.upsertTimeSlot);
router.delete(
  "/timeslots/:id",
  validateObjectId("id"),
  adminController.deleteTimeSlot
);

// Appointments
router.get("/appointments", appointmentController.getAllAppointments);
router.get("/appointments/today", appointmentController.getTodayAppointments);
router.put(
  "/appointments/:id",
  validateObjectId("id"),
  updateAppointmentValidation,
  validate,
  appointmentController.updateAppointment
);

// Job Cards
router.get("/jobcards", jobcardController.getAllJobCards);
router.get("/jobcards/stats", jobcardController.getJobCardStats);
router.get(
  "/jobcards/:id",
  validateObjectId("id"),
  jobcardController.getJobCardById
);
router.post(
  "/jobcards",
  createJobCardValidation,
  validate,
  jobcardController.createJobCard
);
router.put(
  "/jobcards/:id",
  validateObjectId("id"),
  updateJobCardValidation,
  validate,
  jobcardController.updateJobCard
);
router.put(
  "/jobcards/:id/assign-mechanics",
  validateObjectId("id"),
  assignMechanicsValidation,
  validate,
  jobcardController.assignMechanics
);
router.post(
  "/jobcards/:id/items",
  validateObjectId("id"),
  addJobItemValidation,
  validate,
  jobcardController.addJobItem
);
router.delete(
  "/jobcards/:id/items/:itemId",
  validateObjectId("id"),
  jobcardController.removeJobItem
);
router.put(
  "/jobcards/:id/billing",
  validateObjectId("id"),
  updateBillingValidation,
  validate,
  jobcardController.updateBilling
);
router.post(
  "/jobcards/:id/images",
  validateObjectId("id"),
  imageUpload.array("images", 10),
  jobcardController.uploadJobCardImages
);

// Video uploads for job cards
router.post(
  "/jobcards/:id/videos",
  validateObjectId("id"),
  videoUpload.array("videos", 5),
  jobcardController.uploadJobCardVideos
);

// Mixed media uploads for job cards
router.post(
  "/jobcards/:id/media",
  validateObjectId("id"),
  mediaUpload.array("media", 15),
  jobcardController.uploadJobCardMedia
);

// Payments
router.get("/payments", paymentController.getAllPayments);
router.get("/payments/summary", paymentController.getPaymentSummary);
router.get("/payments/today", paymentController.getTodayCollection);
router.post(
  "/payments",
  createPaymentValidation,
  validate,
  paymentController.createPayment
);
router.put(
  "/payments/:id",
  validateObjectId("id"),
  updatePaymentValidation,
  validate,
  paymentController.updatePayment
);
router.post(
  "/payments/:id/refund",
  validateObjectId("id"),
  refundPaymentValidation,
  validate,
  paymentController.processRefund
);
// Invoice PDF download
router.get(
  "/payments/:id/invoice",
  validateObjectId("id"),
  paymentController.downloadInvoice
);

// Reviews
router.get("/reviews", reviewController.getAllReviews);
router.get("/reviews/analytics", reviewController.getReviewAnalytics);
router.put(
  "/reviews/:id/respond",
  validateObjectId("id"),
  adminResponseValidation,
  validate,
  reviewController.respondToReview
);
router.put(
  "/reviews/:id/visibility",
  validateObjectId("id"),
  reviewController.toggleVisibility
);

// ============ Enquiry/Lead Management ============
router.get("/enquiries/stats", enquiryController.getEnquiryStats);
router.get("/enquiries", enquiryController.getEnquiries);
router.post(
  "/enquiries",
  createEnquiryValidation,
  validate,
  enquiryController.createEnquiry
);
router.get(
  "/enquiries/:id",
  validateObjectId("id"),
  enquiryController.getEnquiry
);
router.put(
  "/enquiries/:id",
  validateObjectId("id"),
  updateEnquiryValidation,
  validate,
  enquiryController.updateEnquiry
);
router.post(
  "/enquiries/:id/follow-up",
  validateObjectId("id"),
  addFollowUpValidation,
  validate,
  enquiryController.addFollowUp
);
router.put(
  "/enquiries/:id/assign",
  validateObjectId("id"),
  assignEnquiryValidation,
  validate,
  enquiryController.assignEnquiry
);
router.post(
  "/enquiries/:id/convert",
  validateObjectId("id"),
  convertEnquiryValidation,
  validate,
  enquiryController.convertEnquiry
);
router.delete(
  "/enquiries/:id",
  validateObjectId("id"),
  enquiryController.deleteEnquiry
);

module.exports = router;
