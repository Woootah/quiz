import mongoose from "mongoose"; 

const winnerSchema = new mongoose.Schema({
    username: { 
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