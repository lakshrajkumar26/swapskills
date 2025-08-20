const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "user"],
      default: "user",
    },
    pic:{
      type:String,
    },
    skillsOffered: {
      type: [String],
      default: [],
    }, // e.g. ["React", "Guitar"]
    skillsWanted: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          comment: String,
          stars: { type: Number, min: 1, max: 5 },
        },
      },
    ],
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
