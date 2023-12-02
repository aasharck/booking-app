require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const bookingRoute = require("./routes/booking");
const schedule = require("node-schedule");
const scheduleEmailNotificationsForBookings = require("./utils/emailScheduler");

const app = express();
db();

app.use(express.json());
app.use(cors());

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/book", bookingRoute);

const job = () => {
  const scheduledJob = schedule.scheduleJob("* * * * *", () => {
    scheduleEmailNotificationsForBookings();
  });
};

job();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
