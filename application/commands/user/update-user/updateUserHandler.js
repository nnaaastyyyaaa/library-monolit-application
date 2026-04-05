const { DomainError } = require("../../../../domain/errors/domainError");
const { Email } = require("../../../../domain/value-oblects/email");

class UpdateUserHandler {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(command) {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new DomainError("User not found");
    }

    if (command.email && command.email !== user.email) {
      const email = new Email(command.email);
      const isExist = await this.userRepository.findByEmail(email.value);
      if (isExist) {
        throw new DomainError("User with this email already exists!");
      }
      user.email = email.value;
    }

    user.name = command.name || user.name;
    user.phone_number = command.phone_number || user.phone_number;
    user.role = command.role || user.role;

    await this.userRepository.update(user);
    
    return; 
  }
}

module.exports = { UpdateUserHandler };