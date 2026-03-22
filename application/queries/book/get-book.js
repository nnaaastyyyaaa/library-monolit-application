const { DomainError } = require("../../../domain/errors/domainError");

class GetBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }
  async execute(id) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new DomainError("Cannot find book with this id");
    }
    return book;
  }
}

module.exports = { GetBook };
