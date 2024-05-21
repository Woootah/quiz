import mongoose from "mongoose"

const quizSchema = new mongoose.Schema({
    question: {
        type: String, 
        required: true
    }, 
    type: {
        type: String,
        required: true, 
        enum: ['multiple', 'identification']
    }, 
    choices: {
        type: [String]
    }, 
    correctAnswer: {
        type: String,
        required: true
    }
}) 

export const Question = new mongoose.model('Questions', quizSchema); 