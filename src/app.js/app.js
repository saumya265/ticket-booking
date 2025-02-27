const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\routes\.js");
const ticketRoutes = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\routes\ticketRoutes.js");
const loggerMiddleware = require("C:\Users\Saumya Upadhyay\OneDrive\Desktop\Empower her\Assignment\Ticket-booking-system\src\middlewares\loggerMiddleware.js");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use(loggerMiddleware);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
