
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

  //  gender: {
  //   type: String,
  //   enum:{
  //     values: ["male", "female", "others"],
  //     message: `{VALUE} "is not a valid gender type` , 
  //   },
   
 // costom validation 
gender: {
  type: String,
  validate(value) {
    if (!["male", "female", "others"].includes(value)) {
      throw new Error("Gender is not valid");
    }
  },
},
  

  skills:{
    type:[String],
    validate: {
      validator: function (v) {
        if (v.length > 10) {
          throw new Error("You can add up to 10 skills only");
        }
        v.forEach(skill => {
          if (skill.length > 20) {
            throw new Error("Each skill can be up to 20 characters long");
          }
        });
        return true;
      },
      message: "Skills validation failed",
    },
  
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
  type: String,
  default: "Hi,I am using DevTinder",
  trim: true,
  minlength: 20,
},

role: {
  type: String,
  default: 'user',
  enum: ['user', 'admin'],
},
isSuspended: {
  type: Boolean,
  default: false,
},
suspensionEndTime: Date,
}, {
timestamps: true,
})
  
  
 // {
  //  timestamps:true,
  // });



    userSchema.methods.getJWt =async function() {
      const user = this;


     const token = await  jwt.sign({_id: user.id, role:user.role },"Atul@181523", {
      expiresIn :"1d",
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