// import React, { useEffect } from 'react'
// import {useSocketContext} from '../Context/SocketContext'
// import UseConversation from '../Zustand/UseConversation'
// import notificationSound from '../assets/Sounds/notification.mp3';

// const UseListenMessages = () => {
//    const { socket }  = useSocketContext()
//    const {messages, setMessages} = UseConversation()

//    useEffect(() => {
//     socket?.on("newMessage", (newMessage) => {
//         newMessage.shouldShake = true;
//         const sound = new Audio(notificationSound);
//         sound.play();
//         setMessages([...messages, newMessage]);
//     });

//     return () => socket?.off("newMessage");
// }, [socket, setMessages, messages]);
// }

// export default UseListenMessages


import React, { useEffect } from 'react'
import { useSocketContext } from '../Context/SocketContext'
import UseConversation from '../Zustand/UseConversation'
<<<<<<< HEAD
import notificationSound from "../assets/sounds/notification.mp3";
=======

>>>>>>> parent of b7ba2b7 (Adding Sound)

const UseListenMessages = () => {
   const { socket }  = useSocketContext()
   const { messages, setMessages } = UseConversation()

   useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        // const sound = new Audio();
        // sound.play();
        setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
}, [socket, setMessages, messages]);
}

export default UseListenMessages;
