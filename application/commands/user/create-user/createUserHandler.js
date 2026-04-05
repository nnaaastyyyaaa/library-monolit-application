const bcrypt = require("bcrypt");
const { Email } = require("../../../../domain/value-oblects/email");
const { User } = require("../../../../domain/entities/user");
const { DomainError } = require("../../../../domain/errors/domainError");

class CreateUserHandler {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(command) {
    const email = new Email(command.email);
    const isExist = await this.userRepository.findByEmail(email.value);
    if (isExist) {
      throw new DomainError("User with this email already exists!");
    }

    const encryptedPassword = await bcrypt.hash(command.password, 10);

    const user = new User({
      name: command.name,
      email: email.value,
      password: encryptedPassword,
      phone_number: command.phone_number,
      role: command.role || "user",
    });
    
    const createdUser = await this.userRepository.create(user);
    return createdUser.id; 
  }
}

module.exports = { CreateUserHandler };