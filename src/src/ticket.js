const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateOfTravel: { type: Date, required: true },
  modeOfTravel: { type: String, enum: ["rail", "bus"], required: true },
  perHeadPrice: { type: Number, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  numberOfPassengers: { type: Number, required: true },
  totalPrice: { type: Number, default: function () {
    return this.perHeadPrice * this.numberOfPassengers;
  }},
});

module.exports = mongoose.model("Ticket", ticketSchema);