const { sendEmailNotification } = require("./emailService");
const Booking = require("../models/booking");

const scheduleEmailNotificationsForBookings = async () => {
  try {
    const bookings = await Booking.find({ notified: false }).populate(
      "user",
      "email"
    );

    const currentTimeStamp = Date.now();

    bookings.forEach(async (booking) => {
      const {
        _id,
        date,
        time,
        user: { email },
      } = booking;

      const storedDate = new Date(date);

      const localDate = new Date(storedDate.getTime() - storedDate.getTimezoneOffset() * 60000);

      const [hours, minutes] = time.split(':').map(Number);
      const updatedDate = new Date(localDate);
      updatedDate.setDate(updatedDate.getDate() - 1);
      updatedDate.setHours(hours, minutes);

      const bookingTimeStamp = updatedDate.getTime();

      if (currentTimeStamp >= bookingTimeStamp) {
        await sendEmailNotification(email, date, time, _id);
      }
    });
  } catch (error) {
    console.error("Error scheduling email notifications:", error);
  }
};

module.exports = scheduleEmailNotificationsForBookings;
