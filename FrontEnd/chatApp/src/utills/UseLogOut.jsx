import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const UseLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => { 
		setLoading(true);
		try {
			const res = await axios.post("http://localhost:8000/auth/logout", {}, {
				headers: { "Content-Type": "application/json" }
			});
		
			const data = res.data; 
			
			if (data.error) {
				throw new Error(data.error);
			}
		
			toast.success("Logged out successfully!");
		
			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message || "Logout failed");
		} finally {
			setLoading(false);
		}
		
	};

	return { loading, logout }; 
};

export default UseLogout;
