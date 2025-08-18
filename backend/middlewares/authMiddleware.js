const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader?.startsWith("Bearer")) {
        token = authHeader?.split(" ")[1];     //when auth with Bearer (to find)  => aager mila toh  Bearer ke aage waale splits(" ") krdo with space and array milage toh iska [1] lelo

        if (!token) return res.status(401).json({ message: "No Token Authorization denied" })

        //if token found 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            //why
            req.user = decode;
            console.log("The decoded user is : ",req.user);
            next();
        }
        catch (err) {
            res.status(400).json({ message: "Token is not valid" });
        }
    }
    else{
         res.status(401).json({ message: "No Token Authorization denied" })
    }

}


module.exports = { verifyToken }

// send role in token =>   decode token by middleware => by taking everything in authHeader = req.headers.Authorization => check  authHeader.startsWith("Bearer")
// => token = authHeader.split(" ")[1] => will store the token in it
