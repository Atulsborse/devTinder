const express =require("express");
const profilerouter = express.Router()
const {userAuth} =require("../middlewares/auth")
const {validateEditedata} = require("../utils/validation")

   profilerouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Failed to get profile: " + error.message);
  }
});
profilerouter.patch("/profile/edit", userAuth, async(req ,res)=>{

  try {
    if(!validateEditedata(req)){
      throw new Error("Can't Edit Data"); // ha error catch block madhe jaun rertun hoil    
    }
    const logdinuser = req.user;  // ha actach aahe userAuth sobat
    console.log(logdinuser)

    Object.keys(req.body).forEach((key)=> (logdinuser[key] = req.body[key]));
   
    res.send(`${logdinuser.FirstName},user Updated succesfully`);
    console.log(logdinuser)
  } catch (err) {
    res.status (400).send("ERROR:"+err.message)
    
  }
})

module.exports = profilerouter;