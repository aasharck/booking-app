import axios from "axios";
import React, { useEffect, useState } from "react";
import BookingItem from "./BookingItem";

const BookingsList = ({loading}) => {
  const [bookingData, setBookingData] = useState([]);
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    getBookings();
  }, [loading, deleting]);

  const getBookings = async () => {
    const url = "http://localhost:3000/api/book";
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {
      Authorization: `Bearer ${token.data}`,
    };
    try {
      const res = await axios.get(url, { headers });
      console.log(res.data);
      setBookingData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Doctor's Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Cancel</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => (
            <BookingItem
              key={booking._id}
              id={booking._id}
              doctor={booking.doctor}
              time={booking.time}
              date={booking.date}
              deleting={deleting}
              setDeleting={setDeleting}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
