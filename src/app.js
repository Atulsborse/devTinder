const express = require('express');   
const connectDB= require("./config/database");
const User = require('./models/user');
const authrouter = require('./routes/auth')
 const profilerouter = require('./routes/profile')
 const  requestRouts = require("./routes/request")
 const userRouter = require("./routes/user")
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const admin = require('./routes/admin');

const app = express ()
const port = process.env.PORT || 4000;
const cookieParser = require("cookie-parser"); 


const jwt =require("jsonwebtoken")
const {userAuth} =require("./middlewares/auth");
const router = require('./routes/admin');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




app.use("/", authrouter)
app.use("/", profilerouter)
app.use("/", requestRouts)
app.use("/", userRouter)
app.use('/', admin);









// connectDB()
// .then( ()=> {
//     console.log(" db connection suucesfull")
//     const port = process.env.PORT || 3000;
//     app.listen(port, ()=> {
//         console.log(" server is activate on 3000 ")});
// })
// .catch(err=>{
//  console.error(" Db can not connected")


// })

connectDB()
  .then(() => {
    console.log("DB connection successful");

    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("DB connection failed", err);
  });


 