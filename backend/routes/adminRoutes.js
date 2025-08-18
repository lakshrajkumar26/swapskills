const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middlewares/authMiddleware");
const {authorizeRoles} = require("./../middlewares/roleMiddleware");
const {deleteUser} = require("./../controllers/adminController");

router.use(verifyToken,);
router.use(authorizeRoles("admin"));

router.delete("/deleteuser/:id" , deleteUser);

module.exports = router;