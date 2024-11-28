const express = require("express")
const requestRouts = express.Router(); 
 const {userAuth} = require("../middlewares/auth");
 const ConnectionRequest = require("../models/connectionRequest"); 
const User =require("../models/user");

  requestRouts.post(
    "/request/send/:status/:toUserId",
    userAuth, 
    async (req, res) => {
 try {
    
     const fromUserId = req.user._id;   // sender userauth madhun gheto aahe userid 
     const toUserId = req.params.toUserId; // recever 
     const status = req.params.status; // stusts danamic kel 

 // stust only is accepted or intrested other stus not valid

 const allowedStatus = [ "ignored", "interested"];
 if(allowedStatus.includes.status){
   return res.status(400)
   .json({message:"Invalid status " + status})
 }
  

 // Randonm user id n koni send nahi karu shaknar fkt valid id ne reqst send hoil je db madhe present aahe 
   const toUser = await User.findById(toUserId);
   if(!toUser) {
      return res.status(404).json({
         message:"User not found",
      });
       
   }
   // mysef requst  send nahi karu shakt 2 ;-  shema pre madhe logic implement kela aahe
  

   


 // if there is an existingconnectionrequest in db 
 const  existingconnectionrequest = await ConnectionRequest.findOne({
     $or:[
   {fromUserId, toUserId},
   {fromUserId:toUserId, toUserId:fromUserId},
     ],
   
 });
  if(existingconnectionrequest) {
  return res 
  .status(400) 
  .send({message:" connetion Already exstist!! " })

  }

 
   
      // instace tayar kela connection requst chya
  const connectionRequst = new ConnectionRequest({
  fromUserId,
  toUserId,
  status,
  })



  const data = await connectionRequst.save();
res.json({
 message:"Connection request send succefully ",
 data, 
});


 } catch (err) {
    res.status(400).send("ERROR:" + err.message)
    
 }
     // res.send(user.FirstName+"Connection request sent");
});

// route for riview requst 
requestRouts.post("/request/reviw/:status/:requestId", userAuth, async(req,res) => {
try {


  const loggedInUser = req.user;
  const {status , requestId } = req.params;



  const allowedStatus = ["accepted", "rejected"];
  if (!allowedStatus.includes(status)){

   return res.status(400).json
    ({message: "status not allowed "}); 

  }

    const connectionRequest = await ConnectionRequest.findOne({
   _id: requestId,
      toUserId: loggedInUser._id, 
      status: "interested"
    });
    if(!connectionRequest){
    return res.status(400).json({message:" ConnectionRequast not found "});
  }
   
  
  connectionRequest.status = status;
    const data = await connectionRequest.save()
   res.json({ message:" connection reaqust"  + status, data});

  } 
 catch (err) {
  res.status(400).send("ERROR:"+ err.message);
  
}
});

module.exports = requestRouts;