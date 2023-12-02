import React, {useState} from "react";
import ConfirmDelete from "./ConfirmDelete";
import { useToast } from "@/components/ui/use-toast"
import axios from "axios";

const BookingItem = ({ id, doctor, date, time, deleting, setDeleting }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const newDate = new Date(date);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const handleDelete = async () =>{
    try {
      setDeleting(true)
      const token = JSON.parse(localStorage.getItem("token"));
      const headers = {
        Authorization: `Bearer ${token.data}`,
      };
      const res = await axios.delete(`http://localhost:3000/api/book/${id}`, {headers});
      
      toast({
        description: "Canceled Successfully!"
      })
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Cannot Cancel! Server Error. Please try again later!"
      })
    }finally{
      setDeleting(false)
    }
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {doctor}
      </th>
      <td className="px-6 py-4">
        {newDate.toLocaleDateString("en-US", options)}
      </td>
      <td className="px-6 py-4">{time}</td>
      <td className="px-6 py-4 text-right">
        <a
          onClick={() => setOpen(true)}
          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
        >
          Cancel
        </a>
        <ConfirmDelete open={open} setOpen={setOpen} handleDelete={handleDelete} deleting={deleting}/>
      </td>
    </tr>
  );
};

export default BookingItem;
