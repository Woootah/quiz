import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import Routes from "./routes/quizroutes.js"
import passport from "passport"
import "./passport.js"
import cors from  "cors"
import session from "express-session"

const app = express()

// * middlewares
app.use(express.json())
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    credentials: true, 
    origin: `${process.env.CLIENT_DOMAIN}`, 
    methods: ['POST', 'GET']
}))

// * env
dotenv.config()

// * db connect
mongoose.connect(process.env.DB)
    .then(() => {
        console.log("CONNECTED TO DB"); 
        app.listen(process.env.PORT, () => {
            console.log("LISTENING ON PORT: ", process.env.PORT);
        })
    })
    .catch(error => console.log("ERROR CONNECTING TO DB: ", error)); 

// * routes 
app.use('/', Routes); 