import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios"; 

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login =  async (userName, password) => {
		const success = handleInputErrors(userName, password);
		if (!success) return;
		
        setLoading(true);
		
        try {
		
			
			const res =  await axios.post("http://localhost:8000/auth/login", 
                { userName, password }, {
				headers: { "Content-Type": "application/json"
					
				 }
			});

			const data = res.data; 
            toast.success('Login successful')
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			
			if (data.token) {
				localStorage.setItem('token', data.token); 
			}
			
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message); 
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(userName, password) {
	if (!userName || !password) {
		toast.error("Please fill in all fields");
		return false;
	}


    if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}
    

	return true;
}
