const mongoose =require("mongoose");

const connectionRequstSchema = new mongoose.Schema(
{
fromUserId:{    // sender id shema
 type:mongoose.Schema.Types.ObjectId,
 ref:"User", //refernce to user collection 
 required:true,

},

toUserId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User", // refenace to user collection 
required:true,

},

status:{
type:String,
required:true,
enum:{
    values:["ignored", "interested", "accepted", "rejected"],
    message:`{VALUE} is inccoret status type`,
},
},
 
},
{ timestamps:true}
); 

connectionRequstSchema.pre("save", function (next) {
    const connectionRequest = this;
    // check is fromuser is same as to user 
if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {

    throw new Error("cannot send requst to yourself");
    
}
   next() ;
})
const ConnectionRequstModel= new mongoose.model("ConnectionRequst", connectionRequstSchema  ) 


module.exports = ConnectionRequstModel; 