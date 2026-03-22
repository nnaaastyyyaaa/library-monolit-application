const { Email } = require("../../../domain/value-oblects/email");
const { DomainError } = require("../../../domain/errors/domainError");

class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(id, data) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new DomainError("User not found");
    }
    if (data.email) {
      const email = new Email(data.email);

      const isExist = await this.userRepository.findByEmail(email.value);

      if (isExist && isExist.id !== Number(id)) {
        throw new DomainError("Email already in use");
      }
      user.changeEmail(email.value);
    }

    if (data.password) {
      user.changePassword(data.password);
    }
    if (data.name) {
      user.changeName(data.name);
    }
    if (data.phone_number) {
      user.changePhone(data.phone_number);
    }

    return await this.userRepository.update(id, user);
  }
}

module.exports = { UpdateUser };
