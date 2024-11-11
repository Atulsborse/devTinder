const User =require("../models/user")
const jwt = require("jsonwebtoken")


const userAuth = async (req,res,next) => {
    


    
const cookies =req.cookies;
const {token} =req.cookies
if(!token){
   throw new Error(" token is invalide");

}
const decodedvalue = await  jwt.verify(token,"Atul@181523");

const {_id} = decodedvalue;

const user = await User.findById(_id);
if(!user){
   throw new Error(" user is not found ");
   
};


req.user = user;
next();




}

module.exports = {
    userAuth
}