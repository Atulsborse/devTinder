const express = require('express');   
const connectDB= require("./config/database");
const User = require('./models/user');
const authrouter = require('./routes/auth')
 const profilerouter = require('./routes/profile')
 const  requestRouts = require("./routes/request")
 const userRouter = require("./routes/user")
const app = express ()
const cookieParser = require("cookie-parser"); 


const jwt =require("jsonwebtoken")
const {userAuth} =require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());
app.use("/", authrouter)
app.use("/", profilerouter)
app.use("/", requestRouts)
app.use("/", userRouter)


// get all users 
app.get("/feed", async (req,res)=>{
  
  try { const users =  await User.find({})
  res.send(users)
    
  } catch (error) {
    res.status(400).send("somthing went wrong")
    
  }
});
 
// get user by emailid
app.get("/userbyid" , async (req,res)=>{ 
  const Emailid = req.body.emailid;
  
  try {
    const user = await User.find({ emailid:Emailid})
 
res.send(user)
  } catch (error) {
    res.status(400).send("not get user email")
    
  }
  

});

//delete user
app.delete("/delete", async(req,res)=>{
  
  const userId =req.body.userId;

  try {
    const user = await User.findByIdAndDelete({_id:userId})
  // const user = await User.findByIdAndDelete(userId)
    res.send("user delete succefully")
  } catch (error) {
    res.status(404).send("somting wnet wrong")
    
  }

})








connectDB()
.then( ()=> {
    console.log(" db connection suucesfull")
    app.listen(3000, ()=> {
        console.log(" server is activate on 3000 ")});
})
.catch(err=>{
 console.error(" Db can not connected")


})



 