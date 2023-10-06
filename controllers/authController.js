const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { username, name, password } = req.body;
    if (!username || !name || !password) {
      return res.status(400).json({ success: false, message: "All Fields are required" });
    }

    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ success: false, message: "User Already Registered" });
    }

    const hashedPasswordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username: username, password: hashedPasswordHash, name: name });

    if (!newUser) {
      return res.status(500).json({ success: false, message: "Error while creating new user" });
    }

    return res.status(200).json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const loginController = async(req,res) => {

  try{
     const user = await User.findOne({username:req.body.username});
     if(!user){
      return res.status(400).json({success:false,message:"User is not registered"});
     }
     const matched = await bcrypt.compare(req.body.password,user.password);
     if(!matched){
      return res.status(200).json({success:true,message:"Incorrect Password"});;
     }
     const accessToken = generateAccessToken({
      _id: user._id,
    });
    return res.status(200).json({success:false,message:"User Signed In Successfully",token:"Bearer "+accessToken});
  } catch(error){
    console.log(error);
     return res.status(500).json({success:false, message:"Something went wrong",error:error})
  }
}

//internal functions
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, "SECRET", {
      //here access token private key is our secret key
      expiresIn: "24h",
    });
   // console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const postsController = async(req,res) => {
  try{
     return res.status(200).json({success:true,message:"You can veiw all your posts here :)"})
  } catch(err) {
    return res.status(500).json({success:true,message:"Error while viewing the posts",error:err})
  }
}



module.exports={signupController, loginController, postsController};
