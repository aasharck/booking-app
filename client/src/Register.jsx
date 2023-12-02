import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"

const Register = () => {
  const { toast } = useToast()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
      const url = "http://localhost:3000/api/register";
      const res = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
      toast({
        description: "Account Created Successfully!",
      })
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast({
          variant: "destructive",
          description: error.response.data.message,
        })
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <RegisterForm
        data={data}
        handleChange={handleChange}
        error={error}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Register;
