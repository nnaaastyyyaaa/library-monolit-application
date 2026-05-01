const { DomainError } = require("../../domain/errors/domainError");

class AuthService {
  constructor(userRepository, jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }
  
  validateToken(token) {

   try { return this.jwtService.verifyToken(token); }
   catch (error) {
     throw new DomainError("Invalid token");
   }
 }
}

module.exports = {AuthService};