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

module.exports = {
  create
}