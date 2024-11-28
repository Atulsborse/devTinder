
const mongoose = require("mongoose");
const  validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {

  FirstName:{

    type:String,
    required:true,
    trim:true,
    minLenth:4,
    maxLenth:20,
  },
  LastName:{

    type:String,
    trim:true,
    maxLenth:20,

  },
  emailid:{
 type:String,
  unique:true,
  required:true,
  lowercase:true,
  trim:true,
 validate(value){
  if(!validator.isEmail(value)){
  throw new Error("invalide email adress" + value);
  


  }
 },
  },
  password:{
     require:true,
     type:String,
     validate(value){
      if(!validator.isStrongPassword(value)){
      throw new Error("please add strong passsword" + value);
      
      }
    }
  },
  age:{

 type:Number,
   min:18
  },

   gender: {
    // type: String,
    // enum:{
    //   values: ["male", "female", "others"],
    //   message: `{VALUE} "is not a valid gender type` , 
    // },
   
 // costome validation
 type:String,
 validate(value){
  if(!["male","female","others"].includes(value)){
    throw new Error("gender is not valid")
  }
 }
},
  

  skills:{
   
   
    type:[String],
  
 },

 photoURL:{

  type:String,
  

  validate(value){
    if(!validator.isURL(value)){
    throw new Error("invalide url adress" + value);
    

}
  },
 },
 about:{

  type:String,
  default:" He ther i am using devtinder",
  trim:true,
  maxLenth:20,
}

   },
  
  
  {
    timestamps:true,
   });



    userSchema.methods.getJWt =async function() {
      const user = this;


     const token = await  jwt.sign({_id: user.id },"Atul@181523", {
      expiresIn :"7d",
     }) 
    return token;   

    };


    userSchema.methods.validatePassword = async  function (passwordInputByUser) {
      const  user = this
         const passwordHash = user.password;


        const ispasswordvalid = await  bcrypt.compare(
          passwordInputByUser,
          passwordHash   
          ); 
 
        return ispasswordvalid;
    }


    module.exports = mongoose.model("User", userSchema);