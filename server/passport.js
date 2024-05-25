import passport from "passport"; 
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; 
import mongoose from "mongoose";
import { User } from "./models/user.js";
import dotenv from "dotenv"; 

dotenv.config()

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user); 
    })
    .catch((error) => {
        done(error, null)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, 
(token, tokenSecret, profile, done) => {
    User.findOne({googleId: profile.id}).then((user_exist) => {
        if(user_exist){
            return done(null, false, {message: 'Already Played'})
        }

        const user =  new User({
            googleId: profile.id, 
            displayName: profile.displayName, 
            email: profile.emails[0].value
        }); 

        user.save().then((user) => done(null, user))
        .catch((err) => done(err, false))
    })
    .catch((err) => done(err, false)); 
}
))
