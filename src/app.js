const express = require('express');
const app = express ()
app.use("/test",(req,res) =>{ res.send(" test karun ghe bho lavakar")})
app.use("/hello",(req,res) =>{ res.send(" hello ji kaise app lok ")})
app.use((req,res) =>{ res.send(" hello ji node.js firse jshjsjksl")})




 app.listen(3000, ()=> {console.log(" server is activate on 3000 go to broser and search")});