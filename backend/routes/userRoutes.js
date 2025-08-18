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
// router.get("/user" , verifyToken , authorizeRoles("admin" , "manager" , "user") , (req,res) => {    // this admin , manager ,user all can access
//     res.status(200).json({message : "Welcome User"});
// })
// router.get("/manager" ,verifyToken , authorizeRoles("admin" , "manager") , (req,res) => {
//     res.status(200).json({message : "Welcome Manager"});
// })
// router.get("/admin" ,verifyToken, authorizeRoles("admin") , (req,res) => {
//     res.status(200).json({message : "Welcome Admin"});
// })

router.use(verifyToken);



router.get("/allusers", getAllUsersNormally);
router.get("/", getAllUsers);
router.get("/profile", getMe);
router.put("/updateprofile", updateProfile);

router.post("/editskills", updateSkills);
router.get("/match", getMatches); // place before :id
router.get("/:id", getUserById); // keep this last  coz it thing  metch as id 





module.exports = router;
