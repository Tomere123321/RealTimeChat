import { useState } from "react";
import useConversation from "../Zustand/UseConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
     
      const response = await axios.post(
        `http://localhost:8000/messages/send/${selectedConversation._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
    

      if (Array.isArray(messages)) {
        setMessages([...messages, data]);
      } else {
        setMessages([data]);
      }
    } catch (error) {
      toast.error(error.message);
      console.log('error in Send Message', error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;

