/**
 * Validators Index
 * Central export for all validators
 */
const authValidator = require("./auth.validator");
const userValidator = require("./user.validator");
const vehicleValidator = require("./vehicle.validator");
const appointmentValidator = require("./appointment.validator");
const serviceValidator = require("./service.validator");
const jobcardValidator = require("./jobcard.validator");
const paymentValidator = require("./payment.validator");
const reviewValidator = require("./review.validator");
const customerValidator = require("./customer.validator");
const enquiryValidator = require("./enquiry.validator");

module.exports = {
  ...authValidator,
  ...userValidator,
  ...vehicleValidator,
  ...appointmentValidator,
  ...serviceValidator,
  ...jobcardValidator,
  ...paymentValidator,
  ...reviewValidator,
  ...customerValidator,
  ...enquiryValidator,
};
