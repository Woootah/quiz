import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String
    }, 
    displayName: {
        type: String
    }, 
    email: {
        type: String
    }, 

})

export const User = new mongoose.model('User', userSchema); 