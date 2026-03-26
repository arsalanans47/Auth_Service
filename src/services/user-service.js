const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_KEY } = require('../config/serverConfig');

const UserRepository = require('../repository/user-repository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(userData) {
    try {
      const user = await this.userRepository.create(userData);
      return user;
    } catch (error) {
      console.log("Something went wrong on service layer");
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      // step 1 -> fetch the user using email
       const user = await this.userRepository.getByEmail(email);

       //step 2 -> compare incoming plain password with encrypted password
        const passwordMatch = this.checkPassword(password, user.password);

        if(!passwordMatch) {
          console.log("Password doesn't match");
          throw {error: "Incorrect password"};
        }

        // step 3 -> if password matches then create a JWT token and send it to user
        const newJWT = this.createToken({email: user.email, id: user.id});
        return newJWT;
        
    } catch (error) {
      console.log("Something went wrong in sign in");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: 30 });
      return result;

    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error; 
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response; 
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }

  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;