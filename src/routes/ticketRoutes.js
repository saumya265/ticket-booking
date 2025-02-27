const express = require("express");
const authMiddleware = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\middlewares\authMiddleware.js");
const { createTicket, getTickets, updateTicket } = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\controllers\ticketController.js");
const roleMiddleware = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\middlewares\roleMiddleware.js")
const router = express.Router();

router.use(authMiddleware);

router.post("/", createTicket);
router.get("/", getTickets);
router.put("/:id", updateTicket);

module.exports = router;