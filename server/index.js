import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import Routes from "./routes/quizroutes.js"
import passport from "passport"
import "./passport.js"
import cors from  "cors"
// import session from "express-session"
import cookieSession from "cookie-session"
import MongoStore from "connect-mongo"

const app = express()

// * env
dotenv.config()

// * middlewares
app.set('trust proxy', 1); 
// app.use(session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: false, 
//     cookie: { 
//         maxAge: 1000 * 60 * 60, 
//         secure: true,
//         httpOnly: true, 
//         sameSite: 'None',
//     }, 
//     store: MongoStore.create({
//         mongoUrl: process.env.DB
//     })
// }))
app.use(cookieSession({
    maxAge: 1000 * 60 * 60, 
    keys: [process.env.COOKIE_SECRET]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: process.env.CLIENT_DOMAIN, 
    credentials: true, 
})); 
app.use(express.json())



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