const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require('express-rate-limit') // npm i express-rate-limit

const userRouter = require("./routes/user/userRouter");
const SearchHomeRouter = require("./routes/searchHome/searchHomeRouter")
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass");
const errorController = require('./routes/utils/errorController')

const app = express();

// const APIKeyRouter = require("./routes/utils/APIKeyRouter");

app.use(cors());

console.log(process.env.NODE_ENV) // will return undefined
if (process.env.NODE_ENV === 'development'){
    app.use(logger("dev"));
}

const limiter = rateLimit({ // how many attempts i have when using my api
    max: 5, // # attempts
    windowMs: 60 * 60 * 1000, // time limit
    message: "too many requests from this api, please try again or contact support" // the error message
})

app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));

app.use('/api', limiter) // if my path contains the word /api, then ratelimiter is being used.
app.use("/api/user", userRouter);
app.use('api/search', SearchHomeRouter)

app.all("*", function (req,res, next){ // if none of my paths match, run this error
    next(new ErrorMessageHandlerClass(
        `Cannot find ${req.originalUrl} on this server! Check your URL.`, 
        404
    ))
})

app.use(errorController)

module.exports = app;







