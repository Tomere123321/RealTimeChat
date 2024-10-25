import React from 'react';
import UseGetConversations from '../utills/UseGetonversations'; 
import { getRandomEmoji } from '../utills/Emojis';
import Conversation from './Conversation';


const Conversations = () => {
  const { loading, conversations } = UseGetConversations();

  
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          index={index === conversations.length - 1}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
};

export default Conversations;
