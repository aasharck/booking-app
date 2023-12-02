import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";
import NewBooking from "./components/NewBooking";
import BookingsList from "./components/BookingsList";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [openConfirmation, setOpenConfirmation] = useState(true);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [date, setDate] = useState();
  const [doctor, setDoctor] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    insuranceNo: "",
    phoneNumber: "",
    symptoms: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newData = {
        insuranceNo: data.insuranceNo,
        phoneNumber: data.phoneNumber,
        symptoms: data.symptoms,
        doctor: doctor,
        date: date,
        time: data.time,
      };
      const url = "http://localhost:3000/api/book";
      const token = JSON.parse(localStorage.getItem("token"));
      const headers = {
        Authorization: `Bearer ${token.data}`,
      };
      const res = await axios.post(url, newData, { headers });
      setOpen(false);
      toast({
        description: "Created an Appointment Successfully",
      });
      setData({
        insuranceNo: "",
        phoneNumber: "",
        symptoms: "",
        time: "",
      });
      setDate("");
      setDoctor("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast({
          variant: "destructive",
          description: error.response.data.message,
        });
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="py-32 w-1/2 mx-auto">
        <div className="flex justify-between items-center border-b-2 pb-3">
          <h2 className="text-3xl font-semibold">My Bookings</h2>
          <div className="ml-auto mr-4">
            <Button onClick={() => setOpen(true)}>+ Create Booking</Button>
            <NewBooking
              open={open}
              setOpen={setOpen}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              data={data}
              setDate={setDate}
              date={date}
              doctor={doctor}
              setDoctor={setDoctor}
              loading={loading}
            />
          </div>
        </div>
        <BookingsList loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
