import React, {useState} from 'react'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios';
const Login = () => {
  const { toast } = useToast()
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const url = "http://localhost:3000/api/login";
      const res = await axios.post(url, data);
      localStorage.setItem("token", JSON.stringify(res.data))
      toast({
        description: "Logged In Successfully!"
      })
      window.location = '/'
    } catch (error) {
        toast({
          variant: "destructive",
          description: error.response.data.message,
        })
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className='container h-screen'>
      <Navbar />
      <LoginForm data={data} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading}/>
    </div>
  )
}

export default Login