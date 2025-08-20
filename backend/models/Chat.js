// // models/Chat.js
// const mongoose = require("mongoose");

// const chatSchema = new mongoose.Schema(
//   //   {
//   //     participants: [
//   //       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
//   //     ],
//   //     matchSkill: { type: String }, // optional
//   //   },
//   //   { timestamps: true }

//   {
//     chatName: {
//       type: String,
//       trim: true,
//     },
//     isGroupChat: {
//       type: Boolean,
//       default: false,
//     },
//     users: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     latestMessage: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Message",
//     },
//     groupAdmin: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },

//   { timestamps: true }
// );

// const Chat = mongoose.model("Chat", chatSchema);

// module.exports = Chat;




// models/Chat.js

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {

  
  participants : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
   messages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message"
   }],
   lastMessage : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message"
   }
 
  },{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;





