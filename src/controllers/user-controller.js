const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password
    });
    res.status(201).json({
      message: "successfully created a new user",
      data: response,
      success: true,
      err: {}
    });
  } catch (error) {
    console.log("Something went wrong on controller layer");
    return res.status(error.statusCode).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation
    });
  }
}

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(req.body.email, req.body.password);
    return res.status(200).json({
      message: "successfully signed in",
      data: response,
      success: true,
      err: {} 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error
    });
  }
}

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      message: "user is authenticated and token is valid",
      data: response,
      success: true,
      err: {} 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error
    });
  }
}

const isAdmin = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      success: true,
      data: response,
      message: "successfully fetched whether the user is admin or not",
      err: {}
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: error
    })
  }
}

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin
}