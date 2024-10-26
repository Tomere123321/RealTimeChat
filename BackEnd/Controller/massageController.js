const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const conversationModel = require("../Model/conversationModel");
const messageModel = require("../Model/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");

const router = express.Router();

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; 
    const senderId = req.user._id;


    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();
    
   
    conversation.messages.push(newMessage._id);
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (e) {
    console.log("error in Send Message Controller:", e.message);
    res.status(500).json({ error: "internal Server Error" });
  }
};

router.post("/send/:id", protectRoute, sendMessage);

const getMessages = async (req, res) => {
  try {
    const { id:userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationModel.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) { return res.status(200).json([]);}

    const messages =  conversation.messages

    res.status(200).json({messages})


  } catch (e) {
    console.log("error in get Messages Controller:", e.message);
    res.status(500).json({ error: "internal Server Error" });
  }
}

router.get("/:id", protectRoute, getMessages);

module.exports = router;
