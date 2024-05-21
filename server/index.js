import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import Routes from "./routes/quizroutes.js"

const app = express()

// * middlewares
app.use(express.json())

// * env
dotenv.config()

const db = process.env.DB; 
const port = process.env.PORT;

// * db connect
mongoose.connect(db)
    .then(() => {
        console.log("CONNECTED TO DB"); 
        app.listen(port, () => {
            console.log("LISTENING ON PORT: ", port);
        })
    })
    .catch(error => console.log("ERROR CONNECTING TO DB: ", error)); 

// * routes 
app.use('/quiz', Routes); 