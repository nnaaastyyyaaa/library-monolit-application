const { Email } = require("../../../domain/value-oblects/email");
const { User } = require("../../../domain/entities/user");
const { DomainError } = require("../../../domain/errors/domainError");

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    const email = new Email(data.email);
    const isExist = await this.userRepository.findByEmail(email.value);
    if (isExist) {
      throw new DomainError("User with this email alredy exists!");
    }
    const user = new User({
      name: data.name,
      email: email.value,
      password: data.password,
      phone_number: data.phone_number,
      role: data.role || "user",
    });

    return await this.userRepository.create(user);
  }
}

module.exports = { CreateUser };
