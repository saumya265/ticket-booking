const { body, validationResult } = require("express-validator");

const validateUserRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("mobileNumber").notEmpty().withMessage("Mobile number is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
];

const validateTicketCreation = [
  body("dateOfTravel").isDate().withMessage("Invalid date"),
  body("modeOfTravel").isIn(["rail", "bus"]).withMessage("Invalid mode of travel"),
  body("perHeadPrice").isNumeric().withMessage("Invalid price"),
  body("from").notEmpty().withMessage("From location is required"),
  body("to").notEmpty().withMessage("To location is required"),
  body("numberOfPassengers").isInt({ min: 1 }).withMessage("Invalid number of passengers"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUserRegistration, validateTicketCreation, handleValidationErrors };