const router = require("express").Router()
 const { verifyToken } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("./../middlewares/roleMiddleware");
const  {getMessage ,sendMessage } = require('../controllers/messageController');

router.use(verifyToken)

router.post("/",sendMessage);
router.get("/:chatId",getMessage);

module.exports = router;