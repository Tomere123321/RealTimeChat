import { useEffect, useRef } from "react";
import useGetMessages from "../utills/UseGetMessages";
import LoadingMessages from "./LoadingMessages";
import Message from "./Message";
// import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	const messageArray = messages.messages || [];
	// useListenMessages();
	// const lastMessageRef = useRef();

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	// 	}, 100);
	// }, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messageArray.length > 0 &&
				messageArray.map((message) => (
					<Message key={message._id} message={message} />  
				))}

			{loading && [...Array(3)].map((_, idx) => <LoadingMessages key={idx} />)}
			{!loading && messageArray.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;
