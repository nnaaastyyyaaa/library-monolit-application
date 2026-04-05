const bcrypt = require("bcrypt");
const { DomainError } = require("../../../../domain/errors/domainError");

class LoginHandler {
  constructor(userRepository, jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async execute(command) {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) {
      throw new DomainError("Invalid email");
    }

    const isMatch = await bcrypt.compare(command.password, user.password);

    if (!isMatch) {
      throw new DomainError("Invalid password");
    }

    const token = this.jwtService.generateToken({
      id: user.id,
      role: user.role,
    });

    return token;
  }
}

module.exports = { LoginHandler };