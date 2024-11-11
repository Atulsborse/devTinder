
const mongoose = require("mongoose");
const  validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userShema = new mongoose.Schema(
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

  gender:{

 // costome validation
 type:String,
 validate(value){
  if(!["male","female","others"].includes(value)){
    throw new Error("gender validation fail")
  }
 }
},

  skills:{
   
    type:String,
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

    const User = mongoose.model("User",userShema);
    module.exports = User;


    userShema.methods.getJWt =async function () {
      const user = this;


     const token = await  jwt.sign({_id:user.id},"Atul@181523", {
      expiresIn :"7d",
     })
    return token;

    };


    userShema.methods.validatePassword = async  function (passwordInputByUser) {
      const  user = this
         const passswordhash = user.password 
        const ispasswordvalid = await  bcrypt.compare(passwordInputByUser, passswordhash); 
 
        return ispasswordvalid;
    }


    module.exports = mongoose.model("User".userShema)