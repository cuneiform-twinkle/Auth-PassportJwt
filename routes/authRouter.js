const express = require("express");
const {signupController, loginController, postsController } = require("../controllers/authController");
const router = express.Router();
const passport = require("passport");
require("../passport");


router.post("/register", signupController);
router.post("/login", loginController)
router.get("/posts",passport.authenticate('jwt', {session:false}), postsController);
router.get("/protected", passport.authenticate('jwt', {session:false}), (req,res) => {
  return res.status(200).json({success:true,user:{id:req.user._id,username:req.user.username }})
   }), 
  



module.exports=router;
