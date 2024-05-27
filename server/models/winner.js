import mongoose from "mongoose"; 

const winnerSchema = new mongoose.Schema({
    email: { 
        type: String
    }, 
    dateWon: {
        type: Date, 
        default: Date.now
    }, 
    score: {
        type: Number
    }
})

export const Winner  = new mongoose.model('Winner', winnerSchema); 