const ErrorMessageHandlerClass = require("./ErrorMessageHandlerClass");

function dispatchErrorDevelopment(error, req, res) {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(error.statusCode).json({
            status: error.status,
            error: error,
            message: error.message,
            stack: error.stack
        })
    }
}

function dispatchErrorProduction(error, req, res) {
    if (req.originalUrl.startsWith('/api')) {
        if (error.isOperational) {
            return res.status(error.statusCode).json({
                status: error.status,
                error: error,
                message: error.message,
                stack: error.stack,
            })
        }
    }
    // ^^^ this is to show an operational error
    // below is to show user this error message. we don't want to show the user what the error details are.
    return res.status(error.statusCode).json({
        status: "Error",
        message:
            "Something went wrong. Please contact support at (area code) xxx-xxxx or email us at xxx.mail.com"
    })
}

function handleMongoDBDuplicate(err) {
    let errorMessageDuplicateKey = Object.keys(err.keyValue)[0];
    let errorMessageDuplicateValue = Object.values(err.keyValue)[0];

    //we have parse some data in here.
    let message = `${errorMessageDuplicateKey} - ${errorMessageDuplicateValue} is taken. Please choose another one.`;
    return new ErrorMessageHandlerClass(message, 400)
}

module.exports = (err, req, res, next) => {
    console.log(err.message)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = { ...err };

    error.message = err.message

    if (error.code === 11000 || error.code === 11001) {
        error = handleMongoDBDuplicate(error);
    }

    if (process.env.NODE_ENV === "development") {
        dispatchErrorDevelopment(error, req, res)

    } else {
        dispatchErrorProduction(error, req, res)
    }
};
