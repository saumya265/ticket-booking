const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { getAllUsers, deleteUser, getAllTickets, deleteTicket } = require("../controllers/adminController");
const { validateUserRegistration, handleValidationErrors } = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\middlewares\validationMiddleware.js");
const { registerUser } = require("../controllers/userController");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["admin"])); // Only admins can access these routes

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/tickets", getAllTickets);
router.delete("/tickets/:id", deleteTicket);
router.post("/register", validateUserRegistration, handleValidationErrors,registerUser);
router.get("/", paginationMiddleware, grtTickets);

module.exports = router;