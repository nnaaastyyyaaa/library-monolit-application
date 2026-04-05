const bcrypt = require("bcrypt");
const { DomainError } = require("../../../domain/errors/domainError");

class LoginUser {
  constructor(userRepository, jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new DomainError("Invalid email");
    }

    const isMatch = await bcrypt.compare(password, user.password);

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

module.exports = { LoginUser };
