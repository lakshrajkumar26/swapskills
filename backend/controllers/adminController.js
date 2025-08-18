const User = require("../models/User");
const { ApiError } = require("../utils/apiError");

const deleteUser = async (req, res, next) => {
  try {
    const  username  = req.body?.username;
    const { id } = req.params;
    let deletedUser;
    if (id) {
      deletedUser = await User.findByIdAndDelete(id);
    } else if (username) {
      deletedUser = await User.findOneAndDelete({ username });
    } else {
      return next(new ApiError("User not found", 404));
    }

    if (!deletedUser) {
      return next(ApiError("user not found", 404));
    }
    res.status(200).json({ message: `User deleted `, user: deletedUser });
  } catch (err) {
    console.log(err);
    next(new ApiError("internal server error", 500));
  }
};

module.exports = { deleteUser };
