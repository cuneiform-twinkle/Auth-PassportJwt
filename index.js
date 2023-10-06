
const express = require("express");
const Connection = require("./database/db");
const passport = require("passport");
const dotenv = require("dotenv");
// require("./passport")


/****************IMPORT ROUTES*************/

const authRoutes = require("./routes/authRouter");


/*******************************************/

const app = express();
const PORT = 5000;
const MONGODB_URI ="mongodb://localhost:27017"
dotenv.config();


/****************MIDDLEWARES*************/


//initializing passport
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*******************ROUTES******************/

 app.use("/api", authRoutes);
//  app.get("/protected", passport.authenticate('jwt', {session:false}), (req,res) => {

//   return res.status(200).json({success:true,user:{id:req.user._id,username:req.user.username }})
  
//  }), 

/*******************************************/
Connection(MONGODB_URI);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server is not listening on Port: ${PORT}`);
  } else {
    console.log(`Server is listening on Port: ${PORT}`);
  }
});







