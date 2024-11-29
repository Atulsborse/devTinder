const User =require("../models/user")
const jwt = require("jsonwebtoken")


const userAuth = async (req,res,next) => {
    
// const cookies =req.cookies;
const {token} =req.cookies
if(!token){
   return res.status(401).json({ error: 'Token is invalid or not provided' });

}
const decodedvalue = await jwt.verify(token,"Atul@181523");

const {_id} = decodedvalue;

const user = await User.findById(_id);
if(!user){
   throw new Error(" user is not found ");
   
};


req.user = user;
next();
};
const isAdmin = (req, res, next) => {
   if (req.user.role === 'admin') {
     next();
   } else {
     return res.status(403).send("Access denied");
   }
 };

module.exports = {userAuth,isAdmin }