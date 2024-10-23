import { useEffect, useState } from "react";
import useConversation from "../Zustand/UseConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
      
        const token = localStorage.getItem('token')
        
        const res = await axios.get(
          `http://localhost:8000/messages/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        const data = res.data;

        if (data.error) throw new Error(data.error);
        setMessages(data.messages);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return {   messages ,loading };
};
export default useGetMessages;
