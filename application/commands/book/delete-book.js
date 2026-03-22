const { DomainError } = require("../../../domain/errors/domainError");

class DeleteBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }
  async execute(id) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new DomainError("Book not found");
    }

    return await this.bookRepository.delete(id);
  }
}

module.exports = { DeleteBook };
