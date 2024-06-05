import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import Routes from "./routes/quizroutes.js"
import passport from "passport"
import "./passport.js"
import cors from  "cors"
import session from "express-session"
import MongoStore from "connect-mongo"

const app = express()

// * env
dotenv.config()

// * middlewares
app.use(cors({
    origin: process.env.CLIENT_DOMAIN, 
    credentials: true, 
    methods: ['POST', 'GET']
})); 
app.use(express.json())
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: { 
        maxAge: 1000 * 60 * 60, 
        secure: true,
        httpOnly: false, 
    }, 
    store: MongoStore.create({
        mongoUrl: process.env.DB
    })
}))
app.use(passport.initialize())
app.use(passport.session())



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