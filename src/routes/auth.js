const express = require('express')
const bcrypt = require("bcrypt")
const {validatesingupdata} = require("../utils/validation");
const User = require('../models/user');
const authrouter = express.Router()

// singup api 
authrouter.post ("/singup", async (req,res)=>{

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

authrouter.post("/login" , async (req,res) => { 

  
    try {
      const {emailid, password } = req.body;
      const user = await User.findOne({emailid:emailid});
      if(!user) {
        throw new Error("Invalid credentials");
      }


      const ispasswordvalid = await user.validatePassword(password);
      
      
      if(ispasswordvalid){
    
        // create a jwt token 
    
     const token = await user.getJWt(); // user schema madhe shift kel 
            // he token same profile hit kela var bhetal tar thive verify karn padel karn yaat id ahe
    
        // add the token to cookie and send the responde back to user 
        res.cookie("token" , token);
        res.send("login Succesfull!!!"   )
      
      }else{
      
        throw new Error("invalid credentials");
        
      
      }
    
    } catch (err) {
         res.status(400).send("ERROR :" + err.message);
    }
      
    });


    authrouter.post("/logout", async (req,res)=>{
     res.cookie("token",null,{
     expires:new Date(Date.now()),
     }); // cookies expires karun taakli 
     res.send("Logout succesfully");


    })

module.exports = authrouter;