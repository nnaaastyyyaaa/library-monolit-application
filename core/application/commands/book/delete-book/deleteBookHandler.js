const { DomainError } = require("../../../../domain/errors/domainError");

class DeleteBookHandler {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }
  async execute(command) {
    const book = await this.bookRepository.findById(command.id);
    if (!book) {
      throw new DomainError("Book not found");
    }

    await this.bookRepository.delete(command.id);
  }
}

module.exports = { DeleteBookHandler };
