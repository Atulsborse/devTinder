const express = require('express');
const connectDB= require("./config/database");
const User = require('./models/user');
const app = express ()


app.use(express.json());

app.post ("/singup", async (req,res)=>{
    const user = new User (req.body)
  //   ({
  // FirstName:"brock",
  // LastName:"lesnar",
  // emailid:"lesnar7@gmail.com",
  // gender:"Male"
  //   })

    try{
        await user.save()
        res.send("user added succesfuly");
    }
  catch (err){
              res.status(400).send("Error saving the user: " + err.message );

          
  }
})


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
app.patch("/update", async(req,res)=>{

const userId = req.body.userId;
const data = req.body;
try {
       await User.findByIdAndUpdate({_id: userId }, data, {returnDocument:"before"});
       res.send("user update succefully");
} catch (error) {
  res.status(404).send("not update user")
    
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



 