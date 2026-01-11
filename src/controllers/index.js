/**
 * Controllers Index
 * Central export for all controllers
 */
const authController = require("./auth.controller");
const userController = require("./user.controller");
const vehicleController = require("./vehicle.controller");
const serviceController = require("./service.controller");
const appointmentController = require("./appointment.controller");
const jobcardController = require("./jobcard.controller");
const paymentController = require("./payment.controller");
const reviewController = require("./review.controller");
const adminController = require("./admin.controller");
const uploadController = require("./upload.controller");
const superadminController = require("./superadmin.controller");
const enquiryController = require("./enquiry.controller");

module.exports = {
  authController,
  userController,
  vehicleController,
  serviceController,
  appointmentController,
  jobcardController,
  paymentController,
  reviewController,
  adminController,
  uploadController,
  superadminController,
  enquiryController,
};
