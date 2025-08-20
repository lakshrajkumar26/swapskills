const Chat = require("../models/Chat");
const User = require("../models/User");
const { ApiError } = require("../utils/apiError");



const accessChat = async (req, res, next) => {
  try {
    const { otherUserId } = req.params;

    if (!otherUserId) {
      return next(new ApiError("otherUserId is required", 400));
    }

    //check any earlier chats exist
    let existingChat = await Chat.findOne({
      participants: { $all: [req.user.id, otherUserId] },
    })
      .populate("participants", "-password")
      .populate("lastMessage")
      .populate({
        path: "messages",
        populate: { path: "sender", select: "username email" },
      });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    //Too many nested await calls. Chat.create() returns a document, but in Mongoose you can’t directly chain .populate() on it unless you call .execPopulate() (deprecated) OR refetch with findById.
    const newChat = await Chat.create({
      participants: [req.user.id, otherUserId],
    });
    const fullChat = await Chat.findById(newChat._id)
      .populate("participants", "-password")
      //   .populate("lastMessage");
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "username email" },
      });

    res.status(201).json(fullChat);
  } catch (err) {
    console.log("error in creating new chat", err);
    next(new ApiError("Error creating chat", 500));
  }
};


//This shows all chats (like the sidebar in WhatsApp/Slack).
const fetchChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ participants: req.user.id })
      .populate("participants", "-password")
      .populate({
        path: "lastMessage",
        populate: "sender",
        select: "username,email",
      })
      .sort({ updatedAt: -1 });

    return res.status(200).json({ chats });
  } catch (err) {
    console.error("error fetching chats", err);
    next(new ApiError("Error fetching chats", 500));
  }
};

module.exports = { accessChat, fetchChats  };









// ---------- ----------------------------------------------------------Youtube waala ------------------------------------------------------

// const accessChat = async (req, res, next) => {
//   const { userId } = req.body; //afterchange to req.params
//   try {
//     if (!userId) {
//       next(new ApiError("UserId missing ", 404));
//     }
//     //if chat already with that user then fetch else create one
//     let isChat = await Chat.find({
//       isGroupChat: false,
//       $and: [
//         { users: { $elemMatch: { $eq: req.user.id } } },
//         { users: { $elemMatch: { $eq: userId } } },
//       ],
//     })
//       .populate("users", "-password")
//       .populate("latestMessage"); //take users n latestMessage only

//     //take out the sender  also from Message
//     isChat = await User.populate(isChat, {
//       path: "latestMessage.sender",
//       select: "name email pic",
//     });
//     //if chat exist
//     if (isChat.length > 0) {
//       res.status(200).json({ data: isChat[0] });
//     } else {
//       let chatData = {
//         chatName: "sender",
//         isGroupChat: false,
//         users: [req.user.id, userId], //user.id me // other userId
//       };
//       const createdChat = await Chat.create(chatData);

//       const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
//         "users",
//         "-password"
//       ); //first find he chat just created with id //populate users but not password

//       res.status(200).json(fullChat); //direct
//     }
//   } catch (err) {
//     next(new ApiError("error occurred in fetching Chats", 404));
//   }
// };




// const fetchChats = async (req, res, next) => {
//   try {
//     const chats = await Chat.find({
//       user: { $elemMatch: { $eq: req.user.id } },
//     })
//       .populate("users", "-password")
//       .populate("latestMessage")
//       .sort({ updatedAt: -1 });
//     //  .populate("groupAdmin","-password")  for group

//     const results = await User.populate(chats, {
//       path: "latestMessage.sender",
//       select: "name email pic",
//     });

//     res.status(200).json({ data: chats });
//   } catch (err) {
//     console.log(err);
//     next(new ApiError("error occcured", 500));
//   }
// };