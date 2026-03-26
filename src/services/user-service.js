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
}

module.exports = UserService;