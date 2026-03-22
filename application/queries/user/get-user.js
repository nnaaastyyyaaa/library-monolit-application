const { DomainError } = require("../../../domain/errors/domainError");

class GetUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new DomainError("Cannot find user with this id");
    }
    return user;
  }
}

module.exports = { GetUser };
