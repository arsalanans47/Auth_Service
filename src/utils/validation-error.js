const AppError = require("./error-handler");
const { StatusCodes } = require('http-status-codes');

class ValidationError extends AppError {
  constructor(error) {

    let errName = error.name;
    let explanation = [];
    error.errors.forEach((err) => {
      explanation.push(err.message);
    })

    super(
      errName,
      'Not able to validate the data',
      explanation,
      StatusCodes.BAD_REQUEST,
    )
  }
}

module.exports = ValidationError;