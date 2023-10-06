/***************This code is for passport local strategy, startegy using username and password */

const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel")

const initializingPassport = async(passport) => {
   passport.use(
  new LocalStrategy(async (username, password, done)  =>{
    try{
        console.log(username, password);
        const user = await User.findOne({username});
        if(!user) return done(null,false, {message: "User Not Found"});
        if (user.password !== password) return done(null, false, { message: "Incorrect password" });
        return done(null, user);  
    } catch(error) {
        return done(error, false);  
    }
})
)
passport.serializeUser((user,done) => {
    if(user) {
        return done(null,user.id );
    }
    return done(null,false);
})

passport.deserializeUser((id,done) => {
  User.findById(id, (err,user) => {
    if(err) return done(null,false);
    return done(null,user);
  })
})
}

module.exports=initializingPassport;