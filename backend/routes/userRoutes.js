const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("./../middlewares/roleMiddleware");
const router = express.Router();
const {
  getAllUsers,
  getMe,
  updateProfile,
  getUserById,
  updateSkills,
  getAllUsersNormally,
  getMatches
} = require("../controllers/userController");

router.use(verifyToken);



router.get("/allusers", getAllUsersNormally);
router.get("/", getAllUsers);
router.get("/profile", getMe);
router.put("/updateprofile", updateProfile);

router.put("/editskills", updateSkills);
router.get("/match", getMatches); // place before :id
router.get("/:id", getUserById); // keep this last  coz it thing  metch as id 





module.exports = router;
