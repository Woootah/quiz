import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv"; 
import { User } from "../models/user.js"

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user.id); 
})

passport.deserializeUser(async (id, done) => {
    try{
        const findUser = await User.findById(id); 
        return findUser ? done(null, findUser) : done(null, null); 
    }
    catch(error){
        done(error, null); 
    }
})

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: process.env.GOOGLE_CALLBACK_URL, 
    scope: ['email', 'profile']
}, async (accessToken, refreshToken, profile, done) => {
    let findUser; 
    try {
        findUser = await User.findOne({googleId: profile.id}); 
    } catch (error) {
        return done(error, null); 
    }

    try {
        if(!findUser){
            const newUser = new User({
                googleId: profile.id, 
                email: profile.emails[0].value
            }); 
            const saveNewUser = await newUser.save(); 
            return done(null, saveNewUser); 
        }
        done(null, findUser, {message: "User Exist"}); 
    } catch (error) {
        return done(error, null)
    }
}))