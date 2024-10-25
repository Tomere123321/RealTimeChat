import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UseGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token')
;
       
        const response = await axios.get("http://localhost:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        const data = response.data; 
        
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default UseGetConversations;


