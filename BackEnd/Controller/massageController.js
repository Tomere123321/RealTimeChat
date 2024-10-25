const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const conversationModel = require("../Model/conversationModel");
const messageModel = require("../Model/messageModel");

const router = express.Router();

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; 
    const senderId = req.user._id;

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);
    console.log("Message:", message);

   
    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

   
    const newMessage =  new messageModel({
      senderId,
      receiverId,
      message,
  })

  await newMessage.save();
  console.log("New message saved:", newMessage);
  
  // if (newMessage) {
  //   conversation.messages.push(newMessage._id);
  // }

  conversation.messages.push(newMessage._id);
  await conversation.save();
    
    await conversation.save();
    await newMessage.save()
   
    console.log("New message saved:", newMessage);

    conversation.messages.push(newMessage._id);
    await conversation.save();
  
    res.status(201).json(newMessage);

  } catch (e) {
    console.log("error in Send Massage Controller:", e.message);
    res.status(500).json({ error: "internal Server Error" });
  }
};

router.post("/send/:id", protectRoute, sendMessage);
