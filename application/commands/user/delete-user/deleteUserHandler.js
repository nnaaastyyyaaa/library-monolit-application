const { DomainError } = require("../../../../domain/errors/domainError");

class DeleteUserHandler {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(command) {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new DomainError("User not found");
    }

    await this.userRepository.delete(command.id);
    
    return;
  }
}

module.exports = { DeleteUserHandler };