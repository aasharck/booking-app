const express = require("express");
const Booking = require("../models/booking");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const userBookings = await Booking.find({ user: userId });
    res.json(userBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { insuranceNo, phoneNumber, symptoms, doctor, date, time } = req.body;

    const newBooking = new Booking({
      user: userId,
      insuranceNo,
      phoneNumber,
      symptoms,
      doctor,
      date,
      time,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user._id;

    const bookingToDelete = await Booking.findById(bookingId);
    
    if (bookingToDelete.user._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized. You do not have permission to delete this booking." });
    }

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
