const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ApiError } = require('../utils/apiError');




const register = async (req, res,next) => {
    try {
        const { username, email, password, role } = req.body;
        if(!username || !email || !password) {return next(new ApiError("invalid credentials",500))}
        const hashPassword = await bcrypt.hash(password, 10);
        
        const user = await User.findOne({ username })
        if(user) {return next(new ApiError("user already exist"))};


        const newUser = await User.create({ username, email, password: hashPassword, role });
        res.status(201).json({ success: true, message: `User registered with UserName ${username}` })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({  success: false, message: `User  registration Failed with Error : ${err}`  })
    }

}

const login = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const user = await User.findOne({ username })   //common error dont use Find its give array so error in matching user
        if (!user) return res.status(404).json({ message: `User with username ${username} not founnd` })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "invalid credintials" })

        //if matched 
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({  success: true, message:"User logged in", token,user })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: true,  message: `User  Login Failed with Error : ${err}` })
    }


}

module.exports = { register, login }