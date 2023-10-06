// const { ExtractJwt } = require("passport-jwt");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt=require("passport-jwt").ExtractJwt;
const passport=require("passport");


const opts={};
const User = require("./models/userModel");
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey="SECRET";

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
   // console.log(jwt_payload);
    
    User.findOne({_id: jwt_payload._id})
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        });
}));
