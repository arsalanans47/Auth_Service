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
    res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error
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
    console.log("Something went wrong in sign in controller");
    res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error
    });
  }
}

module.exports = {
  create,
  signIn
}