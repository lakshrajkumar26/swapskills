// // models/Message.js
// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema(
// {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", 
//     },
//       content: {
//         type: String,
//         trim: true,
//       },
//       chat: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Chat",
//       }
//   }
// ,{timestamps:true});

// const Message = mongoose.model("Message", messageSchema);
// module.exports = Message;


// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
{
  sender : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
  },
  chat:{   // from which chat its belongign from 
    type:mongoose.Schema.Types.ObjectId,
    ref:"Chat"
  },
  
   content : {
    type: String,
    required : true
  },

}
,{timestamps:true});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

