const nodemailer = require('nodemailer');
const Booking = require("../models/booking");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

const sendEmailNotification = async (userEmail, date, time, id) => {
  try {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const newDate = new Date(date)
    await Booking.findOneAndUpdate(
      { _id: id },
      { $set: { notified: true } },
    );
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Upcoming Booking',
      text: `You have a booking scheduled on ${newDate.toLocaleDateString('en-US', options)} at ${time}.`
    });
    
    console.log('Email notification sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmailNotification };
