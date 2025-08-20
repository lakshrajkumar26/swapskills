const Chat = require("../models/Chat");
const Message = require("../models/Message");

const sendMessage = async (req, res, next) => {
  try {
    const { chatId, content } = req.body;

    if (!chatId || !content) {
      return next(new ApiError("chatId and content are required", 400));
    }
    const newMessage = await Message.create({
      sender: req.user.id,
      chat: chatId,
      content,
    });

    // Update chat's lastMessage soon after the newChat created
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: newMessage._id,
      $push: { messages: newMessage._id },
    });
    const populateMessage = await Message.findById(newMessage._id)
      .populate("sender", "username email")
      .populate({
        path: "chat",
        populate: {
          path: "messages",
          populate: { path: "sender", select: "username email" },
        },
      }); // <--------------- check here i thing message are not coming there id are coming

    res.status(201).json(populateMessage);
  } catch (err) {
    console.error("error sending message", err);
    next(new ApiError("Error sending message", 500));
  }
};

const getMessage = async (req, res, next) => {
  try {
    //remeber to pass params
    const { chatId } = req.params;

    const allMessages = await Message.find({ chat: chatId })
      .populate("sender", "username email")
      .populate({
        path: "chat",
        populate: {
          path: "messages",
          populate: { path: "sender", select: "username email" },
        },
      })
      .sort({ createdAt: 1 });
    res.status(200).json(allMessages);
  } catch (err) {
    console.log("error in getMessages:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendMessage, getMessage };
