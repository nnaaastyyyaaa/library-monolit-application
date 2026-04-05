const bcrypt = require("bcrypt");
const { Email } = require("../../../domain/value-oblects/email");
const { User } = require("../../../domain/entities/user");
const { DomainError } = require("../../../domain/errors/domainError");

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    console.log(data);
    const email = new Email(data.email);
    const isExist = await this.userRepository.findByEmail(email.value);
    if (isExist) {
      throw new DomainError("User with this email alredy exists!");
    }

    const encryptedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
      name: data.name,
      email: email.value,
      password: encryptedPassword,
      phone_number: data.phone_number,
      role: data.role || "user",
    });
    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }
}

module.exports = { CreateUser };
