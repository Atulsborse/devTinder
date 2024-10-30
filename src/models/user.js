
const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
    {

  FirstName:{

    type:String

  },
  LastName:{

    type:String

  },
  emailid:{
 type:String

  },
  password:{

     type:Number

  },
  age:{

 type:Number

  },

  gender:{

     type:String
  }

    });

    const User = mongoose.model("User",userShema);
    module.exports = User;