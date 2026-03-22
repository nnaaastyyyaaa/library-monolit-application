const { DomainError } = require("../../../domain/errors/domainError");

class DeleteUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new DomainError("User not found");
    }

    return await this.userRepository.delete(id);
  }
}

module.exports = { DeleteUser };
