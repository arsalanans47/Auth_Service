const validateUserAuth = (req, res, next) => {
  if(!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Email or password missing in the signup request"
    })
  }
  next();
}


const validateAdmin = (req, res, next) => {
  if(!req.body.id){
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "User id is missing in the request"
    })
  }
  next();
}

module.exports = {
  validateUserAuth,
  validateAdmin
}