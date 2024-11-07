const express = require('express');
const connectDB= require("./config/database");
const User = require('./models/user');
const app = express ()
const {validatesingupdata} = require("./utils/validation");
const bcrypt = require("bcrypt")



app.use(express.json());

// singup api 
app.post ("/singup", async (req,res)=>{

    try{
      
//validation of data 
validatesingupdata(req);

const {FirstName,LastName ,emailid,password} = req.body;
    // Encrypt the password
    const passswordhash =  await bcrypt.hash(password, 10);
      console.log(passswordhash);

    //  best way to create instace of user
      const user = new User ({
       FirstName,
       LastName,
       emailid,
       password:passswordhash,



      });
        await user.save();
        res.send("user added succesfuly");
    }
  catch (err){
              res.status(400).send("Error saving the user: " + err.message );

          
  }
});


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

// update user
app.patch("/user/:userId", async(req,res)=>{

const userId = req.params.userId;
const data = req.body;

try {
      const ALLOWED_UPDATES =[ "photoURL", "about", "gender", "age", "skills"];
      const isupdatesALOWED = Object.keys(data).every((k)=> 
      ALLOWED_UPDATES.includes(k)
    );

  if (!isupdatesALOWED){
 throw new Error("Updates not allowed");
 
  }

  if(data?.skills.length > 10) {
    throw new Error("Number of skills should not exceed 10");
  }
  await User.findByIdAndUpdate({_id:userId},data, {runValidators:true});
       res.send("user update succefully");
} catch (err) {
  res.status(400).send("UPdate failed" + err.message);
    
}

});

connectDB()
.then( ()=> {
    console.log(" db connection suucesfull")
    app.listen(3000, ()=> {
        console.log(" server is activate on 3000 ")});
})
.catch(err=>{
 console.error(" Db can not connected")


})



 