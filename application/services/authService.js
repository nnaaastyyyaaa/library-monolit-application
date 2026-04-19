const { DomainError } = require("../../domain/errors/domainError");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async validateUserForReservation(userId) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new DomainError("Користувача не знайдено в системі.");
    }

    if (user.role === 'guest') {
      throw new DomainError("Гості не мають права бронювати книги. Будь ласка, зареєструйтесь як повноцінний читач.");
    }

    return true;
  }
}

module.exports = AuthService;