const { ApiError } = require("../utils/apiError");
const User = require("./../models/User");
const bcrypt = require("bcrypt");

const getAllUsersNormally = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return next(new ApiError("no user available ", 404));
    }

    res.status(200).json({ message: "Users found", user: users });
  } catch (err) {
    console.log(err);
    next(new ApiError("internal server error", 500));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { skillsOffered, skillsWanted, limit, page } = req.query;
    let filter = {};
    const pageNum = parseInt(page) || 1; //query always cmes in string
    const limitNum = parseInt(limit) || 5; //per page
    const skip = (pageNum - 1) * limitNum;

    if (skillsOffered) {
      const skillsArray = skillsOffered.split(","); //ai,ml => ["ai","ml"]
      filter.skillsOffered = { $in: skillsArray };
      //$in always take []
      //   feildName :{ $in :[]}
    }
    if (skillsWanted) {
      //   filter.skillsWanted = skillsWanted;
      const skillsArray = skillsWanted.split(","); //gives array
      filter.skillsWanted = { $in: skillsArray };
    }
    console.log("serch kehliye", filter);
    const searchedUsers = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limitNum);
    res
      .status(200)
      .json({ message: "seccuessfully fetched", data: searchedUsers });
  } catch (err) {
    console.log(err);
    next(new ApiError("internal server error", 500));
  }
};


const getMatches = async (req, res, next) => {
  try {
    console.log("hi");
    const user = req.user;

    const currentUser = await User.findById(user.id).select("-password");
    if (!currentUser) {
      return next(new ApiError("User not found", 404));
    }
    // let query = {};
    const { limit, page } = req.query;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = (pageNum - 1) * limitNum;

    const potentialMatches = await User.find({
      _id: { $ne: currentUser._id },
      skillsOffered: { $in: currentUser.skillsWanted },
      skillsWanted: { $in: currentUser.skillsOffered },
    })
      .select("-password")
      .skip(skip)
      .limit(limitNum);

    //understand his part from here {
    // const matchesWithScore = potentialMatches.map((otherUser) => {
    //   const overlap = otherUser.skillsOffered.filter((skill) =>
    //     currentUser.skillsWanted.includes(skill)
    //   ).length;

    //   return {
    //     user: otherUser,
    //     matchScore: overlap,
    //   };
    // });
    // // Sort descending by matchScore
    // matchesWithScore.sort((a, b) => b.matchScore - a.matchScore);

    // to here }

    // res.status(200).json({
    //   message: "Matches found",
    //   count: matchesWithScore.length,
    //   data: matchesWithScore,
    //   page: pageNum,
    //   limit: limitNum,
    // });


    res.status(200).json({
      message: "Matches found",
    //   count: matchesWithScore.length,
      data: potentialMatches ,
      page: pageNum,
      limit: limitNum,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};


const getMe = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  try {
    const me = await User.findOne({ _id: user.id }).select("-password");
    if (!me) {
      return next(new ApiError("please Login again", 500));
    }

    res.status(200).json({ message: " your profile fetched", user: me });
  } catch (err) {
    console.log(err);
    next(new ApiError("internal server error", 500));
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { username, password, email } = req.body;
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      const hashpass = await bcrypt.hash(password, 10);
      updateData.password = hashpass;
    }

    const me = await User.findByIdAndUpdate(
      user.id,
      // { username, email, password: hashpass },  
      updateData,    //so make obj so it will update only given data without error 
      { new: true }
    ).select("-password");

    if (!me) {
      next(new ApiError("unalbe to find your Id", 500));
    }

    res.status(200).json({ message: "User's profile updated", user: me });
  } catch (err) {
    console.log(err);
    next(new ApiError("internal server error", 500));
  }
};

const updateSkills = async (req, res, next) => {
  try {
    const { skillsOffered, skillsWanted } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          skillsOffered: skillsOffered || [],
          skillsWanted: skillsWanted || [],
        },
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Skills updated", user });
  } catch (err) {
    console.log(err);
    next(new ApiError("internal server error", 500));
  }
};

const getUserById = async (req, res, next) => {
  try {
    // /:id
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new ApiError("User not found", 404));
    }

    res.status(200).json({ message: "user found", user: user });
  } catch (err) {
    console.log(err);
    next(new ApiError("internal server error", 500));
  }
};

module.exports = {
  getAllUsers,
  getMe,
  updateProfile,
  getUserById,
  updateSkills,
  getAllUsersNormally,
  getMatches,
};
