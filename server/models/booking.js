const mongoose = require("mongoose");
const User = require("./user");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  insuranceNo: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  symptoms: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notified: {type: Boolean, default: false}
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
