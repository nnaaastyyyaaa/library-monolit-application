const { DomainError } = require("../../domain/errors/domainError");

class AuthService {
  constructor(userRepository, jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }
  
  validateToken(token) {
    return this.jwtService.verifyToken(token);
  }
}

module.exports = {AuthService};