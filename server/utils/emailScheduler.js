const { sendEmailNotification } = require("./emailService");
const Booking = require("../models/booking");

const scheduleEmailNotificationsForBookings = async () => {
  try {
    const bookings = await Booking.find({ notified: false }).populate(
      "user",
      "email"
    );

    const currentTimeStamp = Date.now();
    const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;

    bookings.forEach(async (booking) => {
      const {
        _id,
        date,
        time,
        user: { email },
      } = booking;

      const [hours, minutes] = time.split(":").map(Number);
      const dateTime = new Date(date);

      dateTime.setUTCHours(hours);
      dateTime.setUTCMinutes(minutes);

      const bookingTimeStamp = dateTime.getTime() + userTimezoneOffset;

      if (currentTimeStamp >= bookingTimeStamp) {
        console.log("currentTimeStamp", currentTimeStamp)
        console.log("bookingTimeStamp", bookingTimeStamp)
        await sendEmailNotification(email, date, time, _id);
      }
    });
  } catch (error) {
    console.error("Error scheduling email notifications:", error);
  }
};

module.exports = scheduleEmailNotificationsForBookings;
