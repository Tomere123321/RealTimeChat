import { useEffect, useRef } from "react";
import useGetMessages from "../utills/UseGetMessages";
import LoadingMessages from "./LoadingMessages";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const showLastMessage = useRef()
  const messageList = Array.isArray(messages) ? messages : [];

  useEffect(() => {
	setTimeout(() => {
		showLastMessage.current?.scrollIntoView({ behavior: "smooth" });
	}, 100);
}, [messageList]);

 
return (
	<div className='px-4 flex-1 overflow-auto'>
		{!loading &&
			messageList.length > 0 &&
			messageList.map((message) => (
				<div key={message._id} ref={showLastMessage}>
					<Message message={message} />
				</div>
			))}

		{loading && [...Array(3)].map((_, idx) => <LoadingMessages key={idx} />)}
		{!loading && messageList.length === 0 && (
			<p className='text-center text-gray-400'>Send a message to start the conversation</p>
		)}
	</div>
);
};

export default Messages;

