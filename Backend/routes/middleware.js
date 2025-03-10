const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const authmiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(403).json({message:"Unauthorized"})
    }
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.userID;
        next();
    }
    catch(e){
        res.status(403).json({message:"Invalid token"});
    }
}

module.exports = {
    authmiddleware
}