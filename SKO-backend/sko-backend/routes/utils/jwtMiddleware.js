const jwt = require('jsonwebtoken')

async function checkJwtToken(req, res, next) {
    try {

        if (req.headers && req.headers.authorization) {
            // console.log(req.headers)
            // console.log(req.headers.authorization)
            let jwtToken = req.headers.authorization.slice(7) // bearer_ in our req.headers.auth we have returned our token. So we slice the first 7 letters to get only our jwttoken
            // console.log(jwtToken)
            // console.log(req.headers) // why is this important.  

            let decodedJwt = jwt.verify(jwtToken, process.env.PRIVATE_JWT_KEY) // we dont have a jwt token yet. now for the private jwt key, we are matching our private key to the webbrowser. 
            res.locals.decodedJwt = decodedJwt // what is this doing??
            console.log(decodedJwt)

            next () // if there is no error, we go to the twilioRouter and create the post request.
            // console.log(decodedJwt.message)
            // console.log(decodedJwt.status)

        } else {
            throw { message: "you dont have permission", statusCode: 500 }// if you have a throw, it will automatically jump to the catch block.This is if you are not logged in and dont have a jwtToken.
        }
    } catch (e) {
        next(e)
                // res.status(e.statusCode).json({ message: e.message, error: e })
                // console.log(e.message);
                // console.log(e.code);
    }
}

module.exports = checkJwtToken



// in userController. 
// we logged in. when we login, we receive a jwt token that we created.
// go to client side.  
// when we log in, in Login.js, if we are successful in submitting our email and password in handleOnSubmit, we save our jwt in our browser. Now we need to grab in manually and attached it to our postman in authorization. We need to do the same thing on the client side in our axios call.