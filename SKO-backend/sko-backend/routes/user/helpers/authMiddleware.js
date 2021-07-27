const {
  checkIsEmail,
  checkIsAlpha,
  checkIsEmpty,
  checkIsStrongPassword,
  } = require("../../utils/authMethods");

function checkIsEmptyFunc(req, res, next) {
  let inComingData = req.body;

  const { errorObj } = res.locals;

  for (let key in inComingData) {
    if (checkIsEmpty(inComingData[key])) {
      errorObj[key] = `${key} cannot be empty`;
    }
  }

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  } else {
    next();
  }
}

function checkIsStrongPasswordFunc(req, res, next) {
  const { errorObj } = res.locals;

  if (!checkIsStrongPassword(req.body.password)) {
    errorObj.weakPassword =
      "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8";
  }

  next();
}

function checkIsEmailFunc(req, res, next) {
  const { errorObj } = res.locals;

  if (!checkIsEmail(req.body.email)) {
    errorObj.wrongEmailFormat = "Must be in email format!";
  }

  next();
}

function checkIsAlphaFunc(req, res, next) {
  const { errorObj } = res.locals;
  const inComingData = req.body;
  for (key in inComingData) {
    if (key === "firstName" || key === "lastName") {
      if (!checkIsAlpha(inComingData[key])) {
        errorObj[`${key}`] = `${key} can only have characters`;
      }
    }
  }

  next();
}



module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  };
