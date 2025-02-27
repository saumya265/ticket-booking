const Ticket = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\src\ticket.js");
const User = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\routes\.js");
const { sendEmail } = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\email.js");

// Create a new ticket
const createTicket = async (req, res) => {
  const { dateOfTravel, modeOfTravel, perHeadPrice, from, to, numberOfPassengers } = req.body;
  try {
    const ticket = new Ticket({
      userId: req.user.userId,
      dateOfTravel,
      modeOfTravel,
      perHeadPrice,
      from,
      to,
      numberOfPassengers,
    });
    await ticket.save();

    // Send email notification
    const user = await User.findById(req.user.userId);
    const emailText = 'Your ticket from ${from} to ${to} on ${dateOfTravel} has been booked successfully.';
    await sendEmail(user.email, "Ticket Booking Confirmation", emailText);

    res.status(201).json({ message: "Ticket booked successfully", ticket });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all tickets for the logged-in user
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.userId });
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a ticket (only allowed if more than 24 hours before travel)
const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { dateOfTravel, modeOfTravel, perHeadPrice, from, to, numberOfPassengers } = req.body;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // Check if the ticket belongs to the user
    if (ticket.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "You are not authorized to update this ticket" });
    }

    // Check if the ticket is within 24 hours of travel
    const currentTime = new Date();
    const travelTime = new Date(ticket.dateOfTravel);
    const timeDifference = travelTime - currentTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      return res.status(400).json({ message: "Cannot update ticket within 24 hours of travel" });
    }

    // Update the ticket
    ticket.dateOfTravel = dateOfTravel || ticket.dateOfTravel;
    ticket.modeOfTravel = modeOfTravel || ticket.modeOfTravel;
    ticket.perHeadPrice = perHeadPrice || ticket.perHeadPrice;
    ticket.from = from || ticket.from;
    ticket.to = to || ticket.to;
    ticket.numberOfPassengers = numberOfPassengers || ticket.numberOfPassengers;
    await ticket.save();

    res.json({ message: "Ticket updated successfully", ticket });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createTicket, getTickets, updateTicket };