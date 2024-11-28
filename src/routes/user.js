const express = require('express')
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest  = require('../models/connectionRequest');
 const User = require("../models/user");
const user = require('../models/user');
const USER_SAFE_DATA = "FirstName   LastName  photoURL age gender about skills"

 

userRouter.get("/user/requests/receive", userAuth, async(req, res)=>{
try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
   toUserId: loggedInUser._id,
   status:"interested"
    })//.populate("fromUserId","firstName  lastName");
    .populate("fromUserId",USER_SAFE_DATA)

res.json({ 
    message:"Data fetched successfully",
    data:connectionRequest,

})
} catch (err) {
    req.statusCode(400).send("ERROR:" + err.message)
}



})


 userRouter.get("/user/connections", userAuth, async (req, res)=>{

    try {
        
  const loggedInUser = req.user;
 
  const connectionRequest = await ConnectionRequest.find({

 $or:[
{ toUserId:loggedInUser._id,status:"accepted"},
{fromUserId:loggedInUser._id,status:"accepted"},


 ]
  }).populate("fromUserId",USER_SAFE_DATA )
  .populate("toUserId",USER_SAFE_DATA );

  const data =connectionRequest.map((row)=>{

  if(row.fromUserId._id.toString() === loggedInUser._id.toString() ){
    return row.toUserId

  }return row.fromUserId  });


  res.json({data});
    } catch (err) {
        res.status(400).send({message:err.message}); 
        
    }
 })

 userRouter.get("/feed",userAuth,  async(req,res)=>{

try {

  const loggedInUser = req.user;
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit = limit > 50 ? 50 :limit;
  const skip = (page - 1)* limit;  



  const connectionRequest = await ConnectionRequest.find({
   $or:[{fromUserId:loggedInUser._id}, {toUserId:loggedInUser._id}],
  }).select("fromUserId toUserId")
    .skip(skip)
    .limit(limit) 
 
  const hideUserFromfeed = new Set(); 
  connectionRequest.forEach((req) => { 
 hideUserFromfeed.add(req.fromUserId.toString());
 hideUserFromfeed.add(req.toUserId.toString());
    
  });

  const users = await User.find({    // findimg all user who is not in array 
  $and:[  {_id: {$nin:Array.from(hideUserFromfeed)},},{ ///$nin  meanse not in this aarray
    _id:{$ne:loggedInUser._id}  // $ne measnse not equal to 
  },


  ] 
  }).select(USER_SAFE_DATA) 
  res.send(users);
} catch (err) {
  res.status(400).json({message:err.message});
  
}



 })







module.exports = userRouter