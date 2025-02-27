const User = require("../models/User");
const Ticket = require("../models/Ticket");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("userId", "name email");
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a ticket
const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    await Ticket.findByIdAndDelete(id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllUsers, deleteUser, getAllTickets, deleteTicket };