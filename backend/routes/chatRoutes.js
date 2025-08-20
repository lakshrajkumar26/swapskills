const express = require("express");
const router =  express.Router();
const {accessChat, fetchChats} = require("../controllers/chatController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("./../middlewares/roleMiddleware");


router.use(verifyToken)


router.post("/:otherUserId", accessChat);
router.get("/chats", fetchChats);



module.exports = router;