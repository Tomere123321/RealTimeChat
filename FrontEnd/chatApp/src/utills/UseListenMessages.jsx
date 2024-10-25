import React, { useEffect } from 'react'
import {useSocketContext} from '../Context/SocketContext'
import UseConversation from '../Zustand/UseConversation'
import notificationSound from '../assets/Sounds/notification.mp3' 

const UseListenMessages = () => {
   const { socket }  = useSocketContext()
   const {messages, setMessages} = UseConversation()

   useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
}, [socket, setMessages, messages]);
}

export default UseListenMessages



